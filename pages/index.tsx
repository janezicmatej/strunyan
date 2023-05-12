import { Box, Center, Paper, Stack } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

const colors = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF",
];

function randomItem(list: string[]): string {
  return list[Math.floor(Math.random() * list.length)];
}

interface IRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Home: NextPage = () => {
  const bg = randomItem(colors);
  //console.log(bg);

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

      <Box
        sx={{
          backgroundColor: bg,
          height: "100vh",
          width: "100vw",
          paddingTop: 200,
        }}
      >
        <Center>
          <Paper sx={{ width: "max-content", padding: 50, borderRadius: 34 }}>
            <Stack align="center">
              <Box>
                {" "}
                <h1>
                  {dateFromObject < new Date() &&
                    dateToObject > new Date() &&
                    "Strunjan je letos epski!"}
                  {dateToObject < new Date() && "Strunjan je bil letos epski!"}
                  {dateFromObject > new Date() && "Strunjan bo letos epski!"}
                </h1>
              </Box>
              {dateFromObject > new Date() && (
                <>
                  <Box>
                    <h1>
                      {parsedDateFrom} - {parsedDateTo}
                    </h1>
                  </Box>
                  <Box>
                    <h1>
                      {(remaining?.days + "").padStart(2, "0")}:
                      {(remaining?.hours + "").padStart(2, "0")}:
                      {(remaining?.minutes + "").padStart(2, "0")}:
                      {(remaining?.seconds + "").padStart(2, "0")}
                    </h1>
                  </Box>
                </>
              )}
            </Stack>
          </Paper>
        </Center>
      </Box>
    </div>
  );
};

export default Home;
