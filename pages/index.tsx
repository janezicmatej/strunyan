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

  const date = "2023-07-22";

  const remaining = useCountdown(date);

  return (
    <div>
      <Head>
        <title>Strunyan</title>
        <meta name="description" content="countdown to next strunyan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Center>
        <h1>Strunjan bo letos epski</h1>
      </Center>
      <Center>(to je zato ker se bo začel 22. 7.)</Center>
      <Center>
        <h1>
          {(remaining?.days + "").padStart(2, "0")}:
          {(remaining?.hours + "").padStart(2, "0")}:
          {(remaining?.minutes + "").padStart(2, "0")}:
          {(remaining?.seconds + "").padStart(2, "0")}
        </h1>
      </Center>
    </div>
  );
};

export default Home;
