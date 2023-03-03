package computershop.service;

import computershop.constants.OrderConstants;
import computershop.dto.opinionsModel.EditOpinionsModelDto;
import computershop.dto.orders.AddOrderDTO;
import computershop.dto.orders.OrdersModelWithDifference;
import computershop.exception.customException.NoDataFoundException;
import computershop.exception.customException.SameOrderStatusException;
import computershop.model.OrderProductModel;
import computershop.model.OrdersModel;
import computershop.model.ProductModel;
import computershop.model.UserModel;
import computershop.repository.OrdersRepository;
import computershop.validations.ValidationsFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Valid;
import javax.validation.Validator;
import java.time.LocalDate;
import java.time.Period;
import java.util.*;

@Service
public class OrdersService {

    private final OrdersRepository ordersRepository;
    private final UserService userService;
    private final EmailService emailService;
    private final ProductService productService;
    private final OrderProductService orderProductService;
    private final Map<String, Object> pageableOrders;
    private final ValidationsFacade validationsFacade;

    private Page<OrdersModel> pagedResult;


    public OrdersService(OrdersRepository ordersRepository, UserService userService,
                         EmailService emailService, ProductService productService,
                         OrderProductService orderProductService, ValidationsFacade validationsFacade){

        this.pageableOrders = new HashMap<>();
        this.ordersRepository = ordersRepository;
        this.userService = userService;
        this.emailService = emailService;
        this.productService = productService;
        this.orderProductService = orderProductService;
        this.validationsFacade = validationsFacade;
    }

    public Long addOrder(Long userId,AddOrderDTO addOrderDTO) {

        validationsFacade.validate(addOrderDTO);

        List<Long> list = new ArrayList<>();
        double correctPrice = orderProductService.getCartTotalPrice(addOrderDTO.getCartDTOList());
        addOrderDTO.getCartDTOList().forEach((n) -> list.add(orderProductService.checkoutCart(n.getId(), n.getQuantity())));
        list.removeAll(Collections.singletonList(null));

        if(correctPrice == addOrderDTO.getTotalPrice() && list.size() == 0){

            UserModel userModel = userService.getUserById(userId);
            OrdersModel ordersModel = new OrdersModel();
            ordersModel.setUserModel(userModel);
            ordersModel.setDate(LocalDate.now());
            ordersModel.setStatus(OrderConstants.OrderInProgress);
            ordersModel.setTotalPrice(addOrderDTO.getTotalPrice());
            ordersModel.setAddress(addOrderDTO.getAddress());
            ordersModel.setHouseNumber(addOrderDTO.getHouseNumber());
            ordersModel.setPostalCode(addOrderDTO.getPostalCode());

            Long newOrderId = ordersRepository.save(ordersModel).getId();

            addOrderDTO.getCartDTOList().forEach((n)->{
                ProductModel productModel = productService.getProductById(n.getId());
                productModel.setQuantityAvailable(productModel.getQuantityAvailable()-n.getQuantity());
                OrderProductModel orderProductModel = new OrderProductModel();
                orderProductModel.setOrdersModel(ordersModel);
                orderProductModel.setProductModel(productModel);
                orderProductModel.setQuantity(n.getQuantity());
                orderProductService.addOrderProduct(orderProductModel);
            });
            return newOrderId;
        }else{
            throw new IllegalStateException();
        }
    }

    public List<OrdersModel> getUserOrder(Long userId){
        return ordersRepository.getUserOder(userId);
    }
    public List<OrdersModel> getAllOrders() throws DataAccessException{
        return ordersRepository.findAll();
    }

    public Map<String, Object> getAllOrdersPageable(Integer pageNumber, int pageSize){

        Pageable paging = PageRequest.of(pageNumber, pageSize);

        this.pagedResult = ordersRepository.findAll(paging);

        this.pageableOrders.put("orders", this.pagedResult.getContent());
        this.pageableOrders.put("totalPages", this.pagedResult.getTotalPages());
        this.pageableOrders.put("rowCount", pagedResult.getTotalElements());

        return this.pageableOrders;
    }

    public Map<String, Object> getAllOrdersWithDifference(Integer pageNumber, int pageSize, String searchWord){

        Pageable paging = PageRequest.of(pageNumber, pageSize, Sort.by("date").descending());
        this.pagedResult = ordersRepository.findAllFilterable(paging,searchWord);
        List<OrdersModelWithDifference> orders = new ArrayList<>();

        this.pagedResult.forEach((n)->{
            OrdersModelWithDifference ordersModelWithDifference = new OrdersModelWithDifference();
            ordersModelWithDifference.setId(n.getId());
            ordersModelWithDifference.setAddress(n.getAddress());
            ordersModelWithDifference.setOrderProductModels(n.getOrderProductModels());
            ordersModelWithDifference.setDate(n.getDate());
            ordersModelWithDifference.setHouseNumber(n.getHouseNumber());
            ordersModelWithDifference.setPostalCode(n.getPostalCode());
            ordersModelWithDifference.setTotalPrice(n.getTotalPrice());
            LocalDate date = n.getDate();
            Period period = Period.between(date, LocalDate.now());
            ordersModelWithDifference.setDifference(dateFormater(period.getYears(), period.getMonths(), period.getDays()));

            if(checkDelayed(period.getYears(), period.getMonths(), period.getDays())){

                if(Objects.equals(n.getStatus(), OrderConstants.OrderInProgress))
                {
                    changeOrderStatus(n.getId(),OrderConstants.OrderCanceled, OrderConstants.defaultComment);
                    ordersModelWithDifference.setStatus(OrderConstants.OrderCanceled);

                }else if(Objects.equals(n.getStatus(), OrderConstants.OrderRealized)){
                    ordersModelWithDifference.setStatus(OrderConstants.OrderRealized);
                }else if(Objects.equals(n.getStatus(), OrderConstants.OrderCanceled)) {

                    ordersModelWithDifference.setStatus(OrderConstants.OrderCanceled);
                }
                ordersModelWithDifference.setIsDelayed(true);
            }else{
                ordersModelWithDifference.setIsDelayed(false);
                ordersModelWithDifference.setStatus(n.getStatus());
            }

            orders.add(ordersModelWithDifference);
        });

        this.pageableOrders.put("orders", orders);
        this.pageableOrders.put("totalPages", this.pagedResult.getTotalPages());
        this.pageableOrders.put("rowCount", this.pagedResult.getTotalElements());

        return pageableOrders;
    }

    public OrdersModel getOrderbyId(Long orderId){
        return ordersRepository.findById(orderId).orElseThrow(NoDataFoundException::new);
    }

    public void changeOrderStatus(Long orderId, String orderStatus, String comment){

        OrdersModel ordersModel = this.getOrderbyId(orderId);

        if(Objects.equals(ordersModel.getStatus(), orderStatus)){
            throw new SameOrderStatusException("Zamówienie już ma status " + orderStatus);
        }

        UserModel userModel = ordersModel.getUserModel();
        ordersModel.setStatus(orderStatus);

        if(Objects.equals(orderStatus, OrderConstants.OrderCanceled)){

            List<OrderProductModel> orderProductModels = ordersModel.getOrderProductModels();
            orderProductModels.forEach(n ->{
                ProductModel productModel = n.getProductModel();
                productModel.setQuantityAvailable(productModel.getQuantityAvailable() + n.getQuantity());
            });

            String template = emailService.prepareCanceledTemplate(userModel,ordersModel,comment);
            emailService.sendEmail(ordersModel.getId(),userModel.getEmail(),template);

        }else if(Objects.equals(orderStatus, OrderConstants.OrderRealized)){
            String template = emailService.prepareRealizedTemplate(userModel,ordersModel);
            emailService.sendEmail(ordersModel.getId(),userModel.getEmail(),template);
        }

        ordersRepository.save(ordersModel);
    }

    public void deleteOrder(Long orderId) throws EmptyResultDataAccessException {
        ordersRepository.deleteById(orderId);
    }

    public List<OrdersModel> getOrdersByStatus(String status){
        return ordersRepository.findByStatus(status);
    }

    public Double getOrdersProfit() throws DataAccessException{
        return ordersRepository.getOrdersProfit();
    }

    public void createOrderMail(Long userId, Long orderId){
        UserModel userModel = userService.getUserById(userId);
        OrdersModel ordersModel = this.getOrderbyId(orderId);

        emailService.prepareOrderInProgressTemplate(userModel,ordersModel);
        emailService.sendEmail(ordersModel.getId(),userModel.getEmail(),
                emailService.prepareOrderInProgressTemplate(userModel,ordersModel));

        //emailService.createOrderMail(userModel,ordersModel,OrderConstants.OrderInProgress, null);
    }

    public String dateFormater(int years,int month, int day ){
        String zmienna;

        if(years != 0 ){
            if(month == 0){
                zmienna = years + " Lat" +day + " dni";
            }else{
                zmienna = years + " Lat " + month + " Miesięcy " +day + " dni";
            }
        }else{

            if(month != 0){

                zmienna = month + " Miesięcy " + day + " dni";

            }else{
                zmienna = day + " dni";
            }
        }
        return zmienna;
    }

    public Boolean checkDelayed(int years,int month, int day) {

        if(years != 0){
            return true;
        }else{
            if(month != 0 ){
                return true;
            }else{
                return day > 5;
            }
        }
    }
}