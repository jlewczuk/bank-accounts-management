import { useNavigate } from "react-router-dom";

export const useHandleRoute = () => {
  const navigate = useNavigate();

  return (route: string) => {
    navigate(route);
  };
};
