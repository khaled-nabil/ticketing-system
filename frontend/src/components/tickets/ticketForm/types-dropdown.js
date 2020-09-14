import {FormGroup, Input, Label} from "reactstrap";
import React from "react";
import {sentenceCase} from "../../../helpers/textTransformers"
const RenderTypes = (data) => {
    return (<FormGroup>
        <Label for="ticketType">Select</Label>
        <Input type="select" name="type" id="ticketType" value={data.val} onChange={data.handleChange}>
            <option>-- SELECT A TYPE --</option>
            {data.types.map(element => <option key={element.name}
                                               value={element.name}>{sentenceCase(element.name)}</option>)}
        </Input>
    </FormGroup>);
};
export default RenderTypes;
