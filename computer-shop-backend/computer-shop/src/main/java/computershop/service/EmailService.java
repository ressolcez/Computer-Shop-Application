package computershop.service;
import computershop.constants.OrderConstants;
import computershop.dto.contactForm.CreateContactFormMessage;
import computershop.exception.customException.SendMailException;
import computershop.model.OrdersModel;
import computershop.model.UserModel;
import org.springframework.mail.MailParseException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import javax.mail.MessagingException;
import java.util.Objects;

@Service
public class EmailService {
    private final TemplateEngine templateEngine;
    private final JavaMailSender javaMailSender;
    private final Context context;
    private String process;

    public EmailService(TemplateEngine templateEngine, JavaMailSender javaMailSender) {
        this.templateEngine = templateEngine;
        this.javaMailSender = javaMailSender;
        this.context = new Context();
        this.process = null;
    }

    String prepareOrderInProgressTemplate(UserModel userModel, OrdersModel ordersModel){

        this.context.setVariable("user", userModel);
        this.context.setVariable("order", ordersModel);

        return this.process = templateEngine.process("orderInProgress", this.context);
    }

    String prepareRealizedTemplate(UserModel userModel, OrdersModel ordersModel){

        this.context.setVariable("user", userModel);
        this.context.setVariable("order", ordersModel);
        return this.process = templateEngine.process("realizedOrder", this.context);
    }

    String prepareCanceledTemplate(UserModel userModel, OrdersModel ordersModel, String comment){
        this.context.setVariable("user", userModel);
        this.context.setVariable("order", ordersModel);
        this.context.setVariable("comment", comment);
        return this.process = templateEngine.process("canceledOrder", this.context);
    }

    void sendEmail(Long orderId,String userMail,String template){

        javax.mail.internet.MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);

        try {
            helper.setFrom("computershopsellkon@gmail.com");
            helper.setSubject("Zamówienie numer " + orderId);
            helper.setText(template, true);
            helper.setTo(userMail);
            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new SendMailException(e);
        }
    }

    public void createMessageContactForm(CreateContactFormMessage createContactFormMessage){

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        try {
            mailMessage.setFrom(createContactFormMessage.getEmail());
            mailMessage.setTo("foksie999@gmail.com");
            mailMessage.setSubject(createContactFormMessage.getEmail());
            mailMessage.setText(createContactFormMessage.getMessage());
            javaMailSender.send(mailMessage);
        } catch (MailParseException e) {
            throw new SendMailException(e);
        }
    }
}
