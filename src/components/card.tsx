export default function Card({
    title,
    value
}: {
    title: string;
    value: number
}) {
  const formatCurrency = (amount: number, currency: string = "MXN"): string => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency,
    }).format(amount);
  };
  return (
    <section className="px-4">
      <div className="container m-auto max-w-2xl">
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"'>
          <h2 className="text-3xl text-center font-semibold mb-6">{title}</h2>
          <h3 className="text-lg text-center font-semibold text-gray-800">{formatCurrency(value)}</h3>
        </div>
      </div>
    </section>
  )

}