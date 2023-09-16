import React from "react";
import {Modal} from "../../modal/Modal";
import {getSensibleInitialPosition} from "../../modal/util/GetSensibleInitialPosition";
import {useAdminContext} from "../../../context/AdminContext";

import styles from "./AdminModal.module.scss";
import {AdminAddRemoveTeams} from "../admin-team-add-remove/AdminAddRemoveTeams";
import {Field, Form, Formik} from "formik";

const AdminModal: React.FC = () => {

    const { enableAdminTools, secret, updateSecret, toggleAdminModal } = useAdminContext();

    return (
        <Modal
            title={"🔑 Admin Access Manager 🔑"}
            height={500}
            initialPosition={getSensibleInitialPosition()}
            closable
            onClose={() => toggleAdminModal()}
        >
            <div className={styles.passwordContainer}>
                <Formik
                    initialValues={{
                        secret: secret
                    }}
                    onSubmit={({ secret }) => {
                        updateSecret(secret);
                        window.location = window.location;
                    }}
                >
                <Form>
                    super secret password:
                    <Field
                        name="secret"
                        type="password"
                    />
                    <button type={"submit"}>update</button>
                </Form>
                </Formik>
            </div>
            {enableAdminTools && <AdminAddRemoveTeams />}
        </Modal>
    )
}

export { AdminModal }