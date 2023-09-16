import React from "react";
import {Field, Form, Formik} from "formik";
import {useCreateTeam} from "../../../query/mutation/UseCreateTeam";
import {useCurrentCompetitionIdFromUrl} from "../../../hook/UseCurrentCompetitionIdFromUrl";

const AdminAddNewTeamForm: React.FC = () => {
    const [mutateFunction] = useCreateTeam();

    const competition = useCurrentCompetitionIdFromUrl();

    return (
        <Formik
            initialValues={{
                teamName: ""
            }}
            onSubmit={({ teamName}, formikHelpers) => {
                return mutateFunction({
                    variables: {
                        teamName,
                        competitionId: competition
                    }
                }).then(() => formikHelpers.resetForm())
            }}
        >{(formikProps) => (
            <Form>
                <Field name="teamName" disabled={formikProps.isSubmitting} />
                <button type={"submit"} disabled={formikProps.isSubmitting}>
                    Add
                </button>
            </Form>
        )}
        </Formik>
    )
}

export { AdminAddNewTeamForm };
