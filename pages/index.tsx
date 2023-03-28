import { Center } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

interface IRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Home: NextPage = () => {
  const useCountdown = (targetDate: string) => {
    const countDownDate = new Date(targetDate).getTime();

    const [countDown, setCountDown] = useState(
      countDownDate - new Date().getTime()
    );

    useEffect(() => {
      const interval = setInterval(() => {
        setCountDown(countDownDate - new Date().getTime());
      }, 1000);

      return () => clearInterval(interval);
    }, [countDownDate]);

    return getReturnValues(countDown);
  };

  const getReturnValues = (countDown: number): IRemaining => {
    if (countDown < 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    // calculate time left
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const dateFrom = process.env.NEXT_PUBLIC_STRUNYAN_DATE_FROM || "2000-01-01";
  const dateFromObject = new Date(dateFrom);
  const parsedDateFrom = dateFromObject.toLocaleDateString("sl");

  const dateTo = process.env.NEXT_PUBLIC_STRUNYAN_DATE_TO || "2000-01-02";
  const dateToObject = new Date(dateTo);
  const parsedDateTo = dateToObject.toLocaleDateString("sl");

  const remaining = useCountdown(dateFrom);

  return (
    <div>
      <Head>
        <title>Strunyan</title>
        <meta name="description" content="countdown to next strunyan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Center>
        {" "}
        <h1>
          {dateFromObject < new Date() &&
            dateToObject > new Date() &&
            "Strunjan je letos epski!"}
          {dateToObject < new Date() && "Strunjan je bil letos epski!"}
          {dateFromObject > new Date() && "Strunjan bo letos epski!"}
        </h1>
      </Center>
      {dateFromObject > new Date() && (
        <>
          <Center>
            <h1>
              {parsedDateFrom} - {parsedDateTo}
            </h1>
          </Center>
          <Center>
            <h1>
              {(remaining?.days + "").padStart(2, "0")}:
              {(remaining?.hours + "").padStart(2, "0")}:
              {(remaining?.minutes + "").padStart(2, "0")}:
              {(remaining?.seconds + "").padStart(2, "0")}
            </h1>
          </Center>
        </>
      )}
    </div>
  );
};

export default Home;
