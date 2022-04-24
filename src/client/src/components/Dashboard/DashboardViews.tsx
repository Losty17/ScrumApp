import * as React from "react";
import DashboardOverview from "./views/DashboardOverview";

interface IDashboardViewsProps {
  route: string;
}
const DashboardViews: React.FC<IDashboardViewsProps> = ({
  route,
}): JSX.Element => {
  switch (route) {
    case "overview":
      return <DashboardOverview />;

    default:
      return <h1>404</h1>;
  }
};

export default DashboardViews;
