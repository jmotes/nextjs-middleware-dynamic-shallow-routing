import type { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import Layout from "../../../components/Layout";

const InnerPage: NextPage = () => {
  const [searchState, setSearchState] = useState<{ [key: string]: string }>();
  const router = useRouter();

  // push searchState changes to the querystring
  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSearchState = { [e.target.name]: e.target.value };
    const querystring = new URLSearchParams(newSearchState).toString();
    history.pushState("", "", "?" + querystring);
    setSearchState(newSearchState);
  };

  const selectValue = searchState?.["industry"] ?? "";

  return (
    <Layout title="URL syncing issue">
      <select
        name="industry"
        onChange={onSelectChange}
        style={{ margin: 50, fontSize: 20 }}
        value={selectValue}
      >
        <option value="">-- Industry --</option>
        <option value="agriculture">Agriculture</option>
        <option value="lawn-and-garden">Lawn and Garden</option>
      </select>
    </Layout>
  );
};

export default InnerPage;
