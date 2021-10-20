import { format } from "date-fns";

export const GROUPED_COLUMNS = [
  {
    Header: "ID",
    Footer: "ID",
    accessor: "_id",

    disableFilters: true,
  },
  {
    Header: "USER INFO",
    Footer: "USER INFO",

    disableFilters: true,
    columns: [
      {
        Header: "First Name",
        Footer: "First Name",
        accessor: "Firstname",
        checked: true,
      },
      {
        Header: "Last Name",
        Footer: "Last Name",
        accessor: "Lastname",
        checked: true,
      },
      {
        Header: "Gender",
        Footer: "Gender",
        accessor: "gender",
      },
      // {
      //   Header: "Date of Birth",
      //   Footer: "Date of Birth",
      //   accessor: "date_of_birth",
      //   Cell: ({ value }) => {
      //     return format(new Date(value), "MM/dd/yyyy");
      //   },
      // },
    ],
  },
  {
    Header: "Location",
    Footer: "Location",

    disableFilters: true,
    columns: [
      {
        Header: "Home Address",
        Footer: "Home Address",
        accessor: "Street",
        checked: true,
      },
      {
        Header: "City",
        Footer: "City",
        accessor: "City",
      },
      {
        Header: "Village",
        Footer: "Village",
        accessor: "Village",
        checked: true,
      },
      {
        Header: "Country",
        Footer: "Country",
        accessor: "Country",
      },
    ],
  },
  {
    Header: "Contact Info",
    Footer: "Contact Info",
    disableFilters: true,
    columns: [
      {
        Header: "Email Address",
        Footer: "Email Address",
        accessor: "Email",
        checked: true,
      },
      {
        Header: "Phone",
        Footer: "Phone",
        accessor: "PhoneNum",
        checked: true,
      },
    ],
  },
  {
    Header: "Status",
    Footer: "Status",
    disableFilters: true,
    columns: [
      {
        Header: "Membership",
        Footer: "Membership",
        accessor: "membership",
        checked: false,
      },

      {
        Header: "Voter",
        Footer: "Voter",
        accessor: "Voter",
        checked: false,
      },
    ],
  },
  {
    Header: "Payments",
    Footer: "Payments",
    disableFilters: true,
    columns: [
      {
        Header: "Balance",
        Footer: "Balance",
        accessor: "balance",
        checked: false,
      },
    ],
  },
  {
    Header: "View Member",
    Footer: "View Member",
    disableFilters: true,
    columns: [
      {
        Header: "View Member",
        Footer: "View Member",
        accessor: "",
        checked: true,
      },
    ],
  },
];
