import {useUpdateTeam} from "../../../query/mutation/UseUpdateTeam";
import React from "react";
import {Team} from "../../../../../graphql/generated/Resolver";
import {Field, Form, Formik} from "formik";
import {useDeleteTeam} from "../../../query/mutation/UseDeleteTeam";
import {useSelectContext} from "../../../context/SelectContext";

import styles from "./AdminUpdateTeamForm.module.scss";

type AdminUpdateTeamFormProps = {
    team: Team,
    afterSubmit?: () => void
}

const AdminUpdateTeamForm: React.FC<AdminUpdateTeamFormProps> = ({ team, afterSubmit }) => {
    const [mutateFunction] = useUpdateTeam();
    const [deleteTeam] = useDeleteTeam();

    const { deselectTeam } = useSelectContext();

    return (
        <span className={styles.container}>
            <Formik
                initialValues={{
                    name: team.name,
                    color: team.color
                }}
                onSubmit={async ({ color, name }, formikHelpers) => {
                    await mutateFunction({
                        variables: {
                            id: team.id,
                            newName: name,
                            newColor: color
                        }
                    });

                    afterSubmit && afterSubmit();
                    formikHelpers.resetForm();
                }}
            >
                <Form className={styles.editForm}>
                    <Field
                        name={"name"}
                        className={styles.name}
                    />
                    <Field
                        name={"color"}
                        type={"color"}
                        className={styles.color}
                    />
                    <button
                        type={"submit"}
                        className={styles.update}
                    >
                        Update
                    </button>
                </Form>
            </Formik>
            <button
                className={styles.delete}
                onClick={() => {
                const shouldDelete = confirm('Are you sure, this is not reversible!');

                if (shouldDelete) {
                    deleteTeam({
                        variables: {
                            teamId: team.id
                        }
                    }).then(() => deselectTeam(team.id))
                }
            }
            }>Delete</button>
            <button
                className={styles.cancel}
                onClick={() => afterSubmit()}
            >Cancel</button>
        </span>
    )
}

export { AdminUpdateTeamForm }