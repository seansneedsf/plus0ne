import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { IStore } from "../reducers";
import CustomAvatar from "./Avatar";
import InviteGuestDialog from "./InviteGuestDialog";
const mapStateToProps = (state: IStore) => ({
    lightTheme: state.theme.light
});

export interface IInviteEdit {
    message?: string;
    lightTheme: boolean;
    eventId: string;
}
class InviteEdit extends React.Component<IInviteEdit> {
    render() {
        return (
            <div className="message-container message-container-user-edit">
                <Paper
                    className={`message-content-container message-edit-field invite-edit-border ${
                        this.props.lightTheme
                            ? "host-invite-light"
                            : "host-invite-dark"
                    }`}
                >
                    <InviteGuestDialog
                        eventId = {this.props.eventId}
                    />
                </Paper>
                <div className="message-avatar-container edit-avatar-container">
                    <CustomAvatar
                        themeColor={`${
                            this.props.lightTheme
                                ? "host-invite-avatar-light"
                                : "host-invite-avatar-dark"
                        } invite-edit-border`}
                        avatarName="botAdd"
                    />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(InviteEdit);
