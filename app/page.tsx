import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@/components/builder";
import {BUILDER_PUBLIC_KEY} from "@/common/constants";
import {redirect} from "next/navigation";

builder.init(BUILDER_PUBLIC_KEY);

interface PageProps {
    params: {
        page: string[];
    };
}

export default async function Page(props: PageProps) {
    const model = "page";
    const urlPath = "/" + (props?.params?.page?.join("/") || "")

    if(urlPath === "/") {
        return redirect(`/quiz`);
    }

    const content = await builder
        .get(model, {
            userAttributes: { urlPath },
            prerender: false,
        })
        .toPromise();

    return <RenderBuilderContent content={content} model={model} />;
}

