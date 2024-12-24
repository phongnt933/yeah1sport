enum END_POINT {
  LOGIN = "/users/login",
  REGISTER = "/users/customer",
  FIND_FIELD = "/fields/find",
  CREATE_BOOKING = "/bookings/create-booking",
  CAPTURE_BOOKING = "/bookings/capture-booking",
  GET_LIST_BOOKING = "/bookings",
  GET_LIST_TEAM = "/teams",
  CREATE_TEAM = "/teams/create",
  EDIT_TEAM = "/teams/:id",
  CREATE_MATCHING = "/matchings",
  JOIN_MATCHING = "/matchings/:id",
  FIND_MATCHING = "/matchings/find",
  REFEREE = "/referees",
  CAPTURE_REFEREE = "/referees/capture",
}

export default END_POINT;
