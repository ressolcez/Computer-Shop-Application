import React,{useState, useEffect} from 'react';
import {useCart} from "react-use-cart";
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import StyledLink from '../../SharedComponent/PagesLayoutComponents/StyledLink';
import CategoryServices from '../../SharedComponent/Services/CategoryServices';
import SnackbarSuccess from "../SharedComponents/Snackbars/SnackbarSuccess";
import ProductServices from '../../SharedComponent/Services/ProductServices';
import {motion, AnimatePresence} from "framer-motion"
import "./CategoryComponent.css"

function CategoryComponent() {

  const {addItem} = useCart();
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  const [manufacturerFilter, setManufacturerFilter] = useState([]);
  const [products, setProducts] = useState([]);
  const [minPrice, setMinprice] = useState(0);
  const [maxPrice, setMaxprice] = useState(10000);
  const [page, setPage] = useState(1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);
  const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);
  const [loading,setLoading] = useState(true);
  const [allProducents,setAllProducents] = useState();
  const handleCloseSnackbarSuccess = () => setOpenSnackbarSuccess(false);
  const [allCategoriesName, setAllCategoriesName] = useState([])


  useEffect(() => {

      const getCategoryFilteredContent = async () => {

          const filters = await CategoryServices.getFilters(categoriesFilter,manufacturerFilter,minPrice,maxPrice,page-1);
          const allProducents = await ProductServices.getAllProducents();
          const allCategoriesName = await CategoryServices.getAllCategoriesName();

          Promise.all([filters, allProducents,allCategoriesName]).then(function(response) {
              setTotalNumberOfPages(response[0].data.totalPages);
              setProducts(response[0].data.products);
              setAllProducents(response[1].data)
              setAllCategoriesName(response[2].data)
          })
      }

      getCategoryFilteredContent().then (() =>{
          setLoading(false)
      }).catch (() =>{
          setLoading(true)
      })
  }, [categoriesFilter,manufacturerFilter,minPrice,maxPrice,page]);

  const handleAddToCart = (product) =>{
    addItem(product);
    setOpenSnackbarSuccess(true);
  }

  const handleCheckedCategory = (e, index,type) => {
    let prev;
    let itemIndex;

    if(type === 1){

      prev = categoriesFilter;
      itemIndex = prev.indexOf(index);

      if (itemIndex !== -1) {
        prev.splice(itemIndex, 1);
      } else {
        prev.push(index);
      }
      setCategoriesFilter([...prev]);
    
  }else{

      prev = manufacturerFilter;
      itemIndex = prev.indexOf(index);

      if (itemIndex !== -1) {
        prev.splice(itemIndex, 1);
      } else {
        prev.push(index);
      }
      setManufacturerFilter([...prev]);
  }
  };

  return (
    <>
    <div className='category__wrapper'>
    <div className='category__filters__wrappper'>
        <div className='single__category__filters'>
            <div className='center__box'>
              <p className='title'>Kategorie:</p>
              {
                allCategoriesName && allCategoriesName.map((name,index)=>(
                  <FormControlLabel key={index} control={<Checkbox size='small' onChange={(e) => handleCheckedCategory(e, name, 1)} />} label= {name} />
                ))
                }
            </div>
        </div>
        <div className='price__flters'>
            <div className='center__prices'>
                <p className='title'>Cena:</p>
                <div className='pricee'>
                  <input className='input__price' type = "number" onChange={(e) => setMinprice(e.target.value)}></input>- 
                  <input className='input__price' type = "number" onChange={(e) => setMaxprice(e.target.value)}></input>
                </div>
            </div>
        </div>
          <div className='product__detail__filters'>
          <div className='center__box'>
              <p className='title'>Producent:</p>
              {
              allProducents && allProducents.map((product,index)=>(
                <FormControlLabel key = {index} control={<Checkbox size='small' onChange={(e) => handleCheckedCategory(e, product, 2)}/>} label = {product} />
              ))
              }

          </div>
        </div>

    </div>
    <motion.div layout className='category__product__wrappper'>

    {loading ? (<div style = {{width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>Ładowanie przedmiotów</div>) : 
      (
      <>
        {products.map((product)=>(
        <AnimatePresence key={product.id}>
            <motion.div layout animate = {{opacity: 1}} initial = {{opacity:0}} exit = {{opacity: 0}} className='single__product__wrapper__category'>
                    <div className='img__container__category'>
                      <StyledLink to={"/"+product.categoryModel.categoryName+"/"+product.id}>
                        <img  src = {require(`../../Images/${product.image}`)} alt = "productImage"/>
                      </StyledLink>
                    </div>
                <div className='title__container__category'>{product.name}</div>
                <div className='product__category__container'><b>Kategoria: </b>{product.categoryModel.categoryName} </div>
                <div className='manufacturer__container'><b>Producent: </b>{product.producent} </div>
                <div className='price__btn__container__category'>
                  <div className='price__container__category'>{product.price} PLN</div>
                  <div className='btn__container__category'>
                  <Button variant="contained" style = {{paddingTop: '2px', paddingBottom:'2px'}} color="success" onClick={()=> handleAddToCart(product)}>
                    <AddShoppingCart style ={{width:'20px'}} />
                  </Button>
                  </div>
                </div>
            </motion.div>
          </AnimatePresence>
      ))}
      </>
      ) 
    } 
    </motion.div>
    {!loading &&
    <div className='pagination__container'>
      <Pagination count={totalNumberOfPages} page={page} onChange={(event,value) => setPage(value)} size="large"  variant="outlined" />
    </div>
    }
    <SnackbarSuccess openSnackbarSuccess = {openSnackbarSuccess} handleCloseSnackbarSuccess = {handleCloseSnackbarSuccess} message = "Dodano do koszyka"/>
    </div>
  </>
  )
}

export default CategoryComponent