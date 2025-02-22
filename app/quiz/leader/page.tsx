"use client";

import {makeCall} from "@/common/apiCaller";
import {useEffect, useState} from "react";
import { PersistedSession} from "@/common/storageHelper";
import {Flex, Text, Theme} from "@radix-ui/themes";
import QuizScatterChart from "@/components/chart/scatterChart";
import {LeaderboardEntry} from "@/common/constants";
import LeaderTable from "@/components/table/LeaderTable";

const getLeaders = async () =>{
    const res = await makeCall(`/api/leader`,{}, {
        method: "GET",
        cache: "no-store",
    });

    if (res.status === 200) {
        const response = await res.json();
        return response["data"];
    } else {
        console.error("Failed to fetch data, status code:", res.status);
    }
}

export default function Leader() {
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            getLeaders().then((data) => {
                setLeaders(data ?? []);
            });
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    const leaderboardData: LeaderboardEntry[] = leaders?.map((leader: PersistedSession) => {
        return {
            name: `${leader.username} (${leader.email})`,
            score: leader.score,
            time: leader.time,
            total: leader.total,
        }
    }) ?? [];
    //sort leaderBoardData by score first desc and time second asc
    leaderboardData.sort((a, b) => {
        if (a.score === b.score) {
            return a.time - b.time;
        }
        return b.score - a.score;
    });

    return (
        <Theme>
            <Flex height="88vh" as="div" direction="row">
                <div className="w-full p-10">
                    <br/>
                    <QuizScatterChart data={leaderboardData}/>
                </div>
                <div className="w-full p-10">
                    <Text size="8">प्राप्ताङ्क फलकं (Leaderboard)</Text>
                    <LeaderTable data={leaderboardData}/>
                </div>
            </Flex>
        </Theme>
    );
}
