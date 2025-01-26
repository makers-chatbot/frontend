import { ListItem, Typography } from "@material-tailwind/react";

export function CardNumber({ title, number }) {
  return (
    <ListItem className="flex flex-col  h-full justify-evenly w-full">
      <Typography variant="lead">{title}</Typography>

      <Typography variant="h4" className=" text-6xl">{number}</Typography>
    </ListItem>
  );
}
