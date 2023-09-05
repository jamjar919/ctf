import React from "react";
import {Team} from "../../../../../graphql/generated/Resolver";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useAddPoints} from "../../../query/UseAddPoints";
import * as Yup from 'yup';

import styles from "../../points-table/PointsTable.module.scss";
import {getCurrent24HourTime} from "../../../util/GetCurrent24HourTime";
import {convert24HourTimeToDate} from "../../../util/Convert24HourTimeToDate";

type AdminAddPointsProps = {
    team: Team
}

const AdminAddPointsSchema = Yup.object().shape({
    adjustment: Yup.string()
        .matches(/^-?\d+$/, 'NaN')
        .required('Required'),
    reason: Yup.string()
        .required('Required'),
    timestamp: Yup.string()
        .required('Required')
        .matches(/^([01]\d|2[0-3]):[0-5]\d$/, 'dd:dd'),
});

const AdminAddPointsForm: React.FC<AdminAddPointsProps> = ({ team }) => {
    const [mutateFunction] = useAddPoints();

    return (
        <Formik
            initialValues={{
                adjustment: 0,
                reason: "",
                timestamp: getCurrent24HourTime()
            }}
            validationSchema={AdminAddPointsSchema}
            onSubmit={({ adjustment, reason, timestamp }, formikHelpers) => {
                return mutateFunction({
                    variables: {
                        teamId: team.id,
                        adjustment: Number(adjustment),
                        reason,
                        timestamp: convert24HourTimeToDate(timestamp).toISOString()
                    }
                }).then(() => formikHelpers.resetForm())
            }}
        >{(formikProps) => (
            <Form>
                <table className={styles.table}>
                    <tbody>
                        <tr>
                            <td className={styles.indicator}>+</td>
                            <td className={styles.timestamp}>
                                <Field name="timestamp" disabled={formikProps.isSubmitting} />
                            </td>
                            <td className={styles.adjustment}>
                                <Field name="adjustment" disabled={formikProps.isSubmitting} />
                            </td>
                            <td className={styles.reason}>
                                <Field name="reason" disabled={formikProps.isSubmitting} />
                            </td>
                            <td className={styles.edit}>
                                <button type={"submit"} disabled={formikProps.isSubmitting}>
                                    Add
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.indicator}>
                                {formikProps.isValid ? '✓' : 'X'}
                            </td>
                            <td className={styles.timestamp}>
                                <ErrorMessage name="timestamp" />
                            </td>
                            <td className={styles.adjustment}>
                                <ErrorMessage name="adjustment" />
                            </td>
                            <td className={styles.reason}>
                                <ErrorMessage name="reason" />
                            </td>
                            <td className={styles.edit} />
                        </tr>
                    </tbody>
                </table>
            </Form>
        )}
        </Formik>
    )
}

export { AdminAddPointsForm };
