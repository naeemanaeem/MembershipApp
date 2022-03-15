import { format } from "date-fns";
export const GROUPED_COLUMNS = [
  {
    Header: "ID",
    Footer: "ID",
    accessor: "_id",
  },
  {
    Header: "USER INFO",
    Footer: "USER INFO",

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

      {
        Header: "Date of Birth",
        Footer: "Date of Birth",
        accessor: "date_of_birth",

        Cell: ({ value }) => {
          return format(new Date(value), "MM/dd/yyyy");
        },
      },
    ],
  },
  {
    Header: "Location",
    Footer: "Location",

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

        checked: true,
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

    columns: [
      {
        Header: "Membership",
        Footer: "Membership",
        accessor: "membership",
      },

      {
        Header: "Voter",
        Footer: "Voter",
        accessor: "Voter",
      },
    ],
  },
  {
    Header: "Payments",
    Footer: "Payments",
    columns: [
      {
        Header: "Balance",
        Footer: "Balance",
        accessor: "balance",
      },
    ],
  },
  {
    Header: "View Member",
    Footer: "View Member",

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
