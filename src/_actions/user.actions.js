import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export cosnt userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
            user => {
                dispatch(sucess(user));
                history.push('/');
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
            user => {
                dispatch(success());
                history.push("/login");
                dispatch(alertActions.success('Registration successful'));
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
            user => dispatch(success(user)),
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
            );
    };

    function request(user) { return { type: userConstants.GETALL_REQUEST, user } }
    function success(user) { return { type: userConstants.GETALL_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
            user => {
                dispatch(success(id));
            },
            error => {
                dispatch(failure(id, error));
            }
            );
    };

    function request(user) { return { type: userConstants.DELETE_REQUEST, user } }
    function success(user) { return { type: userConstants.DELETE_REQUEST, user } }
    function failure(error) { return { type: userConstants.DELETE_REQUEST, error } }

}