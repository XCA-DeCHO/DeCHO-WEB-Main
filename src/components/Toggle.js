import { useDispatch, useSelector } from "react-redux";

const Toggle = () => {
  const dispatch = useDispatch();

  const darkTheme = useSelector((state) => state.status.darkTheme);

  const handleChange = () => {
    if (!darkTheme) {
      dispatch({ type: "dark_mode" });
    } else {
      dispatch({ type: "light_mode" });
    }
  };

  return (
    <>
      <div className="mode_button" onClick={handleChange}>
        {darkTheme ? (
          <i className="ph-sun-dim"></i>
        ) : (
          <i className="ph-moon"></i>
        )}
      </div>
    </>
  );
};

export default Toggle;
