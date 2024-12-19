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

  MATCHING = "/user/matching",
}

export default END_POINT;
