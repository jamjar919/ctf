import {useUpdateTeamColor} from "../../../query/mutation/UseUpdateTeamColor";
import React from "react";
import {Team} from "../../../../../graphql/generated/Resolver";
import {Field, Form, Formik} from "formik";

type AdminUpdateTeamColorInputProps = {
    team: Team
}

const AdminUpdateTeamColorInput: React.FC<AdminUpdateTeamColorInputProps> = ({ team }) => {
    const [mutateFunction] = useUpdateTeamColor();

    return (
        <Formik
            initialValues={{
                color: team.color
            }}
            onSubmit={async ({ color }, formikHelpers) => {
                await mutateFunction({
                    variables: {
                        id: team.id,
                        newColor: color
                    }
                });

                formikHelpers.resetForm();
            }}
        >
            <Form>
                <Field
                    name={"color"}
                    type={"color"}
                />
                <button type={"submit"}>
                    Update
                </button>
            </Form>
        </Formik>
    )
}

export { AdminUpdateTeamColorInput }