import React from "react";
import ApplicationAttribrute from "./ApplicationAttribute";

export default function AssetForm({assetRequest, setAssetRequest}: any){
    return(
        <React.Fragment>
            <ApplicationAttribrute type={"Assets"} attributeRequest={assetRequest} setAttributeRequest={setAssetRequest} />
        </React.Fragment>
    );
}