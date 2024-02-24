import React, { useState, useEffect } from "react";
import BACKEND_URL from "../utils/config";
import Table from "./table";
import ScrollToTopButton from "./scrollToTopButton";
import HashLoader from "react-spinners/HashLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#058ED9",
};

const Bills = ({ updateTrigger }) => {
  const [data, setData] = useState({
    pepcoData: [],
    washgasData: [],
    wsscData: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const isDataEmpty =
    !data?.pepcoData?.length &&
    !data?.washgasData?.length &&
    !data?.wsscData?.length;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/user/data`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        setData(jsonResponse);
        console.log("Data fetched successfully", jsonResponse);
      } else {
        console.error("Response not ok");
      }
    } catch (error) {
      console.error("Data fetching error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [updateTrigger]);

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center mt-40">
          <HashLoader
            color="#058ED9"
            loading={isLoading}
            cssOverride={override}
            size={60}
          />
        </div>
      ) : isDataEmpty ? (
        <p className="font-bold text-2xl italic flex items-center justify-center mt-40">
          No data exists
        </p>
      ) : (
        <>
          <>
            {data?.pepcoData?.length > 0 && (
              <Table
                title="Pepco Listings Data"
                data={data.pepcoData}
                columns={[
                  { key: "client_id", name: "Client ID" },
                  { key: "account_owner_id", name: "Account Owner ID" },
                  { key: "account_number", name: "Account Number" },
                  { key: "bill_date", name: "Bill Date" },
                  { key: "download_date", name: "Download Date" },
                ]}
              />
            )}
            {data?.washgasData?.length > 0 && (
              <Table
                title="WashGas Listings Data"
                data={data.washgasData}
                columns={[
                  { key: "Client_ID", name: "Client ID" },
                  { key: "account_owner_id", name: "Account Owner ID" },
                  { key: "account_number", name: "Account Number" },
                  { key: "bill_date", name: "Bill Date" },
                  { key: "download_date", name: "Download Date" },
                ]}
              />
            )}
            {data?.wsscData?.length > 0 && (
              <Table
                title="WSSC Listings Data"
                data={data.wsscData}
                columns={[
                  { key: "client_id", name: "Client ID" },
                  { key: "account_owner_id", name: "Account Owner ID" },
                  { key: "account_number", name: "Account Number" },
                  { key: "bill_date", name: "Bill Date" },
                  { key: "download_date", name: "Download Date" },
                ]}
              />
            )}
          </>
        </>
      )}
      <ScrollToTopButton />
    </div>
  );
};

export default Bills;
