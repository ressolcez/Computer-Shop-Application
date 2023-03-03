import axios from 'axios'

class CategoryServices{

    getFilters(categoriesFilter,manufacturerFilter,minPriceFilter,maxPriceFilter,page){

        if(minPriceFilter === ''){
            minPriceFilter = 0;
        }

        if(maxPriceFilter === ''){
            maxPriceFilter = 1000000;
        }

        let categoriesFilterString = categoriesFilter.toString();
        let manufacturerFilterString = manufacturerFilter.toString();
        return axios.get('http://localhost:8080/api/products/filters/CategoryPageFilters', 
        { params: 
            { categories: categoriesFilterString, manufacturer: manufacturerFilterString, minPrice: minPriceFilter, maxPrice: maxPriceFilter, pageNumber: page} 
        })
    }  

    getAllCategoriesName(){
        return axios.get("http://localhost:8080/api/category/allNames")
    } 
    

}

export default new CategoryServices()