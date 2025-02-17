import { Box } from "@radix-ui/themes";
import { Tabs } from "radix-ui";
import React from "react";

type NavigationItem = {
    key: string;
    name: string;
    content: React.ReactNode;
};

type NavigationTabsProps = {
    navigation: NavigationItem[];
    defaultValue: string;
};

const NavigationTabs = ({ navigation, defaultValue }: NavigationTabsProps) => (
    <Tabs.Root defaultValue={defaultValue}>
        <Tabs.List>
            {navigation.map((item) => (
                <Tabs.Trigger key={item.key} value={item.key.toLowerCase()}>
                    {item.name}
                </Tabs.Trigger>
            ))}
        </Tabs.List>
        <Box pt="3">
            {navigation.map((item) => (
                <Tabs.Content key={item.key} value={item.key.toLowerCase()}>
                    {item.content}
                </Tabs.Content>
            ))}
        </Box>
    </Tabs.Root>
);

type NavigationProps = {
    navigation: NavigationItem[];
    defaultValue?: string;
};

export default function Navigation({ navigation, defaultValue }: NavigationProps) {
    return (
        <NavigationTabs
            navigation={navigation}
            defaultValue={defaultValue || navigation[0].key}
        />
    );
}