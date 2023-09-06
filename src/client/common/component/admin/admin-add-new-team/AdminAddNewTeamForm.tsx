import React from "react";
import {Field, Form, Formik} from "formik";
import {useCreateTeam} from "../../../query/mutation/UseCreateTeam";

const AdminAddNewTeamForm: React.FC = () => {
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
        >{(formikProps) => (
            <Form>
                <Field name="teamName" disabled={formikProps.isSubmitting} />
                <button type={"submit"} disabled={formikProps.isSubmitting}>
                    Add team
                </button>
            </Form>
        )}
        </Formik>
    )
}

export { AdminAddNewTeamForm };
