import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../../actions/employees";

export default function Paginate({ page }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const totalPages = useSelector((state) => state.employees.totalPages);

  useEffect(() => {
    dispatch(getEmployees(page));
  }, [page]);

  return (
    <Pagination
      page={+page}
      className={classes.root}
      count={totalPages}
      variant="outlined"
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`/dashboard?page=${item.page}`}
          {...item}
        />
      )}
    />
  );
}
