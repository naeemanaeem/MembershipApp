export const GROUPED_COLUMNS = [
  {
    Header: "ID",
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "USER INFO",

    disableFilters: true,
    columns: [
      {
        Header: "First Name",

        accessor: "Firstname",
      },
      {
        Header: "Last Name",

        accessor: "Lastname",
      },
      {
        Header: "Gender",

        accessor: "Gender",
      },
      {
        Header: "Date of Birth",

        accessor: "DateOfBirth",
      },
      {
        Header: "Spouse",
        accessor: "Spouse",
      },
    ],
  },
  {
    Header: "LOCATION",

    disableFilters: true,
    columns: [
      {
        Header: "House #",
        accessor: "HouseNo",
      },
      {
        Header: "Street",
        accessor: "Street",
      },
      {
        Header: "Village",
        accessor: "Village",
      },
      {
        Header: "City",
        accessor: "City",
      },
      {
        Header: "State",
        accessor: "State",
      },
      {
        Header: "Country",
        accessor: "country",
      },
      {
        Header: "Postal Code",
        accessor: "Postcode",
      },
    ],
  },
  {
    Header: "CONTACT INFO",
    disableFilters: true,
    columns: [
      {
        Header: "Email",
        accessor: "Email",
      },
      {
        Header: "Phone #",
        accessor: "PhoneNum",
      },
    ],
  },
  {
    Header: "STATUS",
    disableFilters: true,
    columns: [
      {
        Header: "Membership",
        accessor: "membership",
        checked: true,
      },

      {
        Header: "Voter",
        accessor: "Voter",
        checked: true,
      },
    ],
  },
  // {
  //   Header: "PAYMENTS",
  //   disableFilters: true,
  //   columns: [
  //     {
  //       Header: "Balance",
  //       accessor: "balance",
  //       checked: true,
  //     },
  //   ],
  // },
];
