import React from "react";
import {Field, Form, Formik} from "formik";
import {useCreateTeam} from "../../../query/UseCreateTeam";

const AdminAddNewTeam: React.FC = () => {
    const [mutateFunction] = useCreateTeam();

    return (
        <Formik
            initialValues={{
                teamName: ""
            }}
            onSubmit={({ teamName}, formikHelpers) => {
                return mutateFunction({
                    variables: {
                        teamName
                    }
                }).then(() => formikHelpers.resetForm())
            }}
        >
            <Form>
                <Field name="teamName" />
                <button type={"submit"}>
                    Add team
                </button>
            </Form>
        </Formik>
    )
}

export { AdminAddNewTeam }