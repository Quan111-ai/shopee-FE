import React, { useEffect, useState, useRef } from "react";
import { Box, CircularProgress, Typography, Tabs, Tab } from "@mui/material";
import ProductCard from "../product/ProductCard";
import SellerCard, { Seller } from "./sellerCard";
import productService from "../../services/productService";

interface Product {
  _id: string;
  title: string;
  price: number;
  imageURL: string;
  description: string;
  Quality: string;
}

interface Props {
  keyword: string;
}

const LIMIT = 20;

const SearchResults: React.FC<Props> = ({ keyword }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  const fetchResults = async (kw: string, pg: number) => {
    if (loading || !kw) return;
    setLoading(true);
    try {
      const res = await productService.searchGlobal({ keyword: kw, page: pg, limit: LIMIT });
      const pList = res.data?.data?.products || [];
      const sList = res.data?.data?.sellers || [];
      setProducts((prev) => (pg === 1 ? pList : [...prev, ...pList]));
      if (pg === 1) setSellers(sList);
      setHasMore(pList.length === LIMIT);
    } catch (err) {
      console.error("❌ Lỗi gọi searchGlobal:", err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (keyword.trim()) {
      setProducts([]);
      setSellers([]);
      setPage(1);
      setHasMore(true);
      fetchResults(keyword, 1);
    }
  }, [keyword]);

  useEffect(() => {
    if (page > 1) fetchResults(keyword, page);
  }, [page]);

  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore && tabIndex === 0) {
        setPage((prev) => prev + 1);
      }
    });

    if (lastItemRef.current) observer.current.observe(lastItemRef.current);
  }, [loading, hasMore, tabIndex]);

  return (
    <Box sx={{ px: 4, py: 3 }}>
      <Typography variant="h6" fontWeight={700} mb={2}>
        🔍 Kết quả cho: <strong>{keyword}</strong>
      </Typography>

      <Tabs value={tabIndex} onChange={(_, val) => setTabIndex(val)} sx={{ mb: 2 }}>
        <Tab label={`🧦 Sản phẩm (${products.length})`} />
        <Tab label={`🧑 Người bán (${sellers.length})`} />
      </Tabs>

      {tabIndex === 0 && (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 2 }}>
          {products.map((item, index) => {
            const isLast = index === products.length - 1;
            return (
              <Box key={item._id} ref={isLast ? lastItemRef : null}>
                <ProductCard product={item} />
              </Box>
            );
          })}
        </Box>
      )}

      {tabIndex === 1 && (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 2 }}>
          {sellers.length === 0 ? (
            <Typography color="text.secondary">Không tìm thấy người bán phù hợp.</Typography>
          ) : (
            sellers.map((seller) => (
              <SellerCard key={seller._id || seller.storeName} seller={seller} />
            ))
          )}
        </Box>
      )}

      {loading && (
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default SearchResults;