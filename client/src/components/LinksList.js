import React from "react";

export const LinksList = ({ links }) => {
  // if (links.length) {
  //   return (
  //     <p>Ссылок нет</p>
  //   )
  // }

  return (
    <table className="striped">
      <thead>
      <tr>
        <th>#</th>
        <th>From</th>
        <th>To</th>
      </tr>
      </thead>
      <tbody>
      {/*{links.map((elem, index) => {*/}
      {/*  return (*/}
      {/*    <tr>*/}
      {/*      <td>{index + 1}</td>*/}
      {/*      <td>{elem.from}</td>*/}
      {/*      <td>{elem.to}</td>*/}
      {/*    </tr>*/}
      {/*  )*/}
      {/*})}*/}
      </tbody>
    </table>
  )
}
