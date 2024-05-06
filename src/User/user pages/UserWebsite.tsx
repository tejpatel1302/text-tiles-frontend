import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../features/redux_toolkit/cartSlice';
import { fetchProducts } from '../../features/redux_toolkit/productSlice';
import ProductCard from './Card';
import { getProductsApi, getProductsWithSubIDApi } from '@/features/api/apicall';
import { selectUserCurrentToken } from '@/features/redux_toolkit/userAuthSlice';
import { useCookies } from "react-cookie";
import { Search } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


const UserWebsite = ({ title }: { title: string }) => {
  const dispatch = useDispatch();
  const [cookie] = useCookies(["auth"]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const[searchText, setSearchText] = useState('')
//   const { subId } = useSelector((state: any) => state.subId);
// console.log(subId ,'hihellocho')

let subcategoryId = localStorage.getItem("subcategoryId");
if (subcategoryId !== null && subcategoryId !== "") {
  subcategoryId = subcategoryId.replace(/"/g, "");
}

console.log(subcategoryId, 'please solve');

console.log(subcategoryId,'jiiijij')
  const [showProducts, setShowProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let res;
        if (subcategoryId) {
          const payload = { Authorization: `Bearer ${cookie.auth}` };
          res = await getProductsWithSubIDApi(payload, subcategoryId );
          setShowProducts(res);
          setFilteredProduct(res)
        } else {
          const payload = { Authorization: `Bearer ${cookie.auth}` };
          res = await getProductsApi(payload);
          setShowProducts(res?.data || res);
          setFilteredProduct(res?.data)
        }
        console.log(res, 'getprductsji');
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
  
    fetchData();
  }, [subcategoryId, cookie.auth]);
  

  const handleAdd = (product: any) => {
    dispatch(add(product));
  };
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentProducts = filteredProduct.slice(firstPostIndex, lastPostIndex);
  return (
    <div className="mx-auto ml-24">
             <div className="container">
   <div className="search-box">
      <input type="text" className="search-input" placeholder="Search Product" onChange={(e)=>{setSearchText(e.target.value)}}/>

      <button className="search-button">
        <i className="fas fa-search" onClick={()=>{
        const filteredProductData:any = showProducts.filter((res) =>
          res?.name.toLowerCase().includes(searchText.toLowerCase())
        );
        
          setFilteredProduct(filteredProductData)
        }}><Search/></i>
      </button>
   </div>
</div>
      <div className='text-2xl font-semibold mt-10'>{title}</div>
      <div className='flex flex-wrap gap-10'>
        {currentProducts?.map((product: any) => (
          <div key={product?.title}>
            <ProductCard image={subcategoryId  ? product?.colorRelation[0]?.image : product?.colorRelation[0]?.image} title={subcategoryId  ? product?.name : product.title} price={subcategoryId  ? product?.price :product.price} id={subcategoryId  ? product?.id :product.id} productid={subcategoryId  ? product?.id : product?.colorRelation[0]?.productId}/>
          </div>
        ))}
      </div>
      <div>
      <PaginationSection
            totalPosts={filteredProduct.length}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
      </div>
    </div>
  );
};

export default UserWebsite;

function PaginationSection({
  totalPosts,
  postsPerPage,
  currentPage,
  setCurrentPage,
}: {
  totalPosts: any;
  postsPerPage: any;
  currentPage: any;
  setCurrentPage: any;
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const maxPageNum = 5; // Maximum page numbers to display at once
  const pageNumLimit = Math.floor(maxPageNum / 2); // Current page should be in the middle if possible

  let activePages = pageNumbers.slice(
    Math.max(0, currentPage - 1 - pageNumLimit),
    Math.min(currentPage - 1 + pageNumLimit + 1, pageNumbers.length)
  );

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to render page numbers with ellipsis
  const renderPages = () => {
    const renderedPages = activePages.map((page, idx) => (
      <PaginationItem
        key={idx}
        className={currentPage === page ? "bg-neutral-100 rounded-md" : ""}
      >
        <PaginationLink onClick={() => setCurrentPage(page)}>
          {page}
        </PaginationLink>
      </PaginationItem>
    ));

    // Add ellipsis at the start if necessary
    if (activePages[0] > 1) {
      renderedPages.unshift(
        <PaginationEllipsis
          key="ellipsis-start"
          onClick={() => setCurrentPage(activePages[0] - 1)}
        />
      );
    }

    // Add ellipsis at the end if necessary
    if (activePages[activePages.length - 1] < pageNumbers.length) {
      renderedPages.push(
        <PaginationEllipsis
          key="ellipsis-end"
          onClick={() =>
            setCurrentPage(activePages[activePages.length - 1] + 1)
          }
        />
      );
    }

    return renderedPages;
  };

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevPage} />
          </PaginationItem>

          {renderPages()}

          <PaginationItem>
            <PaginationNext onClick={handleNextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
