

// import { UserType } from '@/lib/types'
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
// import App from '@/components/plaid/PlaidHome';
// import { QuickstartProvider } from '@/components/plaid/Context';
import PlaidWrapper from '@/components/plaid/PlaidWrapper';
import Products from '@/components/plaid/Components/ProductTypes/Products';
import { QuickstartProvider } from '@/components/plaid/Context';

export default async function ProductsPage(props: {
  searchParams: Promise<{ q: string; offset: string }>;
}) {
  const searchParams = await props.searchParams;

  const session = await auth();
  console.log('Session', session);
  const user = session?.user as any;
  if (!user) {
    redirect('/login');
  }
  const user_id = user.id;

  // const response = await fetch(
  //   `http://localhost:3000/api/aws/card_recommendations`,
  //   { method: 'POST', body: JSON.stringify({ user_id: user.id }) }
  // );
  // const data = await response.json();
  // const recommendations = data?.recommended_list;
  // const recommendation_successful = data.status == 'transactions used';
  // if (!recommendation_successful){
  //   redirect("/plaid")
  // }
  const newOffset = null;
  return (
    <QuickstartProvider>
      <PlaidWrapper user_id={user_id} />
      <div className="w-full h-full bg-black"></div>
      <Products user_id={user_id} />
    </QuickstartProvider>
  );
}
