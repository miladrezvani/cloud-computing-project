import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";

const Castbox = ({ name, character, profile }) => {
  return (
    <Card className=" bg-blue-gray-700">
      <CardHeader floated={false} className="h-80 bg-blue-gray-900">
        <img src={profile} alt="profile-picture" />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" className="mb-2 text-xl text-gray-200">
          {name}
        </Typography>
        <Typography className="font-medium text-gray-400" textGradient>
          {character}
        </Typography>
      </CardBody>
    </Card>
  );
};

export default Castbox;
