import { List, Typography } from "@material-tailwind/react";
import { BarCharts } from "../../widgets/charts";
import {
  CardNumber,
  Categories,
  Product,
  ProductList,
} from "../../widgets/custom";
import { useState } from "react";

export function Dashboard() {
  const [counterContract, setCounterContracts] = useState("0");

  return (
    <div className=" h-full w-full py-16 flex flex-row">
      <aside className="w-1/6 h-full  ml-12 overflow-auto p-4 border-2 rounded-md flex flex-col">
        <Typography variant="h2" className="w-full text-center mb-4 ">
          Categories
        </Typography>

        <List className="flex flex-col w-full h-full overflow-auto space-y-6 ">
          <Categories name="Computing" stock={"12"} state={"sold out"} />
          <Categories name="Flashlights" stock={"0"} state={"nothing"} />
          <Categories name="Printers" stock={"20"} state={"good"} />
        </List>
      </aside>

      <main className="w-2/4 h-full ml-12 p-2 border-2 rounded-md ">
        <Typography variant="h2" className="w-full text-center ">
          Interactions by Category
        </Typography>

        <div className=" w-full  flex flex-col  justify-center  h-5/6  ">
          <BarCharts />
        </div>
      </main>

      <section className="w-1/4 h-full ml-12 mr-12  p-4 flex flex-col border-2 rounded-md">
        <top className="flex flex-row h-1/3 mb-4  space-x-4 ">
          <div className=" h-full w-1/2  border-2 rounded-md">
            <CardNumber title={"Active Contracts"} number={"10"} />
          </div>

          <div className=" h-full w-1/2  border-2 rounded-md">
            <CardNumber title={"Closed Contracts"} number={"150"} />
          </div>
        </top>

        <main className="flex flex-col h-2/3 w-full p-4 border-2 rounded-md justify-evenly ">
          <Typography variant="h3" className="text-center">
            Featured Product
          </Typography>

          <List className="flex flex-row">
            <Product />
          </List>

          <Typography className="text-center">
            This product is involved in {counterContract} contracts
          </Typography>
        </main>
      </section>
    </div>
  );
}

export default Dashboard;
