import { ListItem, Typography } from "@material-tailwind/react";


const getStockColorClass = (state) => {
    switch (state.toLowerCase()) {
      case "sold out":
        return "text-red-300";
      case "good":
        return "text-green-300";
      case "nothing":
        return "text-black";
      default:
        return "text-gray-700";
    }
  };

export function Categories({ name, stock, state }) {


    

return (
    <ListItem className="flex flex-col justify-center items-center bg-gray-50 rounded-lg p-4 border">
      <Typography variant="lead" className="mb-2">
        {name}
      </Typography>


      <div className="flex flex-row space-x-2 ">

        <Typography>    

            Stock disponible: 
        </Typography>

        <Typography className={`font-medium ${getStockColorClass(state)}`}>
        {`${stock}`}
      </Typography>

      </div>

    </ListItem>
  );
}




export default Categories;

