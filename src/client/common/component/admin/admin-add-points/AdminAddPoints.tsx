import React from "react";
import {Team} from "../../../../../graphql/generated/Resolver";
import {Field, Form, Formik} from "formik";
import {useAddPoints} from "../../../query/UseAddPoints";

type AdminAddPointsProps = {
    team: Team
}

const AdminAddPoints: React.FC<AdminAddPointsProps> = ({ team }) => {
    const [mutateFunction] = useAddPoints();

    return (
        <Formik
            initialValues={{
                adjustment: 0,
                reason: "",
                timestamp: new Date().toISOString()
            }}
            onSubmit={({ adjustment, reason, timestamp }, formikHelpers) => {
                return mutateFunction({
                    variables: {
                        teamId: team.id,
                        adjustment: Number(adjustment),
                        reason,
                        timestamp
                    }
                }).then(() => formikHelpers.resetForm())
            }}
        >{(formikProps) => (
            <Form>
                <Field name="timestamp" disabled={formikProps.isSubmitting} />
                <Field name="adjustment" disabled={formikProps.isSubmitting} />
                <Field name="reason" disabled={formikProps.isSubmitting} />
                <button type={"submit"} disabled={formikProps.isSubmitting}>
                    Add points
                </button>
            </Form>
        )}
        </Formik>
    )
}

export { AdminAddPoints }