'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
  TableCell
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Product } from './product';
// import { SelectProduct } from '@/lib/db';
import { ProductType } from 'app/types/ProductTypes';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useContext, useEffect } from 'react';
import Context from '@/components/plaid/Context';

export function ProductsTable({
  offset,
  user_id
}: {
  offset: number;
  user_id: string;
}) {
  let router = useRouter();
  let productsPerPage = 5;

  function prevPage() {
    router.back();
  }

  const [products, setProducts] = useState<ProductType[]>([]);
  const { linkSuccess, accessToken } = useContext(Context);
  console.log('access_token', accessToken);
  console.log('linkSuccess', linkSuccess);
  function nextPage() {
    router.push(`/?offset=${offset}`, { scroll: false });
  }

  useEffect(() => {
    console.log('user_id', user_id);
    fetch('/api/aws/card_recommendations', {
      method: 'POST',
      headers: {},
      body: JSON.stringify({ user_id: user_id })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse the response JSON
      })
      .then((newProducts: { recommended_list: ProductType[] }) => {
        console.log('new', newProducts);
        setProducts(newProducts.recommended_list); // Update state with the parsed products
      })
      .catch((error) => {
        console.error('Failed to fetch products:', error); // Handle errors gracefully
      });
  }, [user_id, accessToken]);

  return linkSuccess ? (
    <Card>
      {/* <Button
          className="h-[50px] w-[100px] bg-black"
          onClick={() => {
            fetch('/api/aws/card_recommendations', {
              method: 'POST',
              headers: {},
              body: JSON.stringify({ user_id: user_id || _user_id })
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // Parse the response JSON
              })
              .then((newProducts: ProductType[]) => {
                setProducts(newProducts); // Update state with the parsed products
              })
              .catch((error) => {
                console.error('Failed to fetch products:', error); // Handle errors gracefully
              });
          }}
        >
          Regenerate
        </Button> */}
      <CardHeader className="flex">
        <CardDescription>View your Recommended Cards</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>

              <TableHead className="hidden md:table-cell">Annual Fee</TableHead>

              <TableHead>
                <span className="sr-only">Purchase</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          {/* {products && products.length > 0 ? (
            <TableBody>
              {products.map((product) => (
                <Product key={product.name} product={product} />
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell>
                  <span>Loading</span>
                </TableCell>
              </TableRow>
            </TableBody>
          )} */}
        </Table>
      </CardContent>
      {/* <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {Math.max(0, Math.min(offset - productsPerPage, totalProducts) + 1)}-{offset}
            </strong>{' '}
            of <strong>{totalProducts}</strong> products
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === productsPerPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + productsPerPage > totalProducts}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter> */}
    </Card>
  ) : (
    <></>
  );
}
