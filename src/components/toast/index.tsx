import {
	CheckCircle,
	Warning,
	WarningCircle,
	XCircle,
} from '@phosphor-icons/react';
import { toast } from 'sonner';

import styles from './styles.module.css';

/**
 * Displays a success toast notification.
 *
 * @param message - The main message to be displayed in the toast.
 * @param description - Optional. Additional description to be displayed in the toast.
 */
function success(message: string): void;
function success(message: string, description: string): void;

function success(message: string, description?: string) {
	toast(message, {
		className: `${styles.toast} ${styles.success}`,
		description: description,
		duration: 3000,
		icon: <CheckCircle className={styles.icon} weight='fill' />,
	});
}

/**
 * Displays an error toast notification.
 *
 * @param message - The main message to be displayed in the toast.
 * @param description - Optional. Additional description to be displayed in the toast.
 */
function error(message: string): void;
function error(message: string, description: string): void;

function error(message: string, description?: string) {
	toast(message, {
		className: `${styles.toast} ${styles.error}`,
		description: description,
		duration: 3000,
		icon: <XCircle className={styles.icon} weight='fill' />,
	});
}

/**
 * Displays an info toast notification.
 *
 * @param message - The main message to be displayed in the toast.
 * @param description - Optional. Additional description to be displayed in the toast.
 */

function info(message: string): void;
function info(message: string, description: string): void;

function info(message: string, description?: string) {
	toast(message, {
		className: `${styles.toast} ${styles.info}`,
		description: description,
		duration: 3000,
		icon: <WarningCircle className={styles.icon} weight='fill' />,
	});
}

/**
 * Displays a warning toast notification.
 *
 * @param message - The main message to be displayed in the toast.
 * @param description - Optional. Additional description to be displayed in the toast.
 */
function warning(message: string): void;
function warning(message: string, description: string): void;

function warning(message: string, description?: string) {
	toast(message, {
		className: `${styles.toast} ${styles.warning}`,
		description: description,
		duration: 3000,
		icon: <Warning className={styles.icon} weight='fill' />,
	});
}

/**
 * Object containing methods to display different types of toast notifications.
 *
 * @property success - Method to display a success toast notification.
 * @property error - Method to display an error toast notification.
 * @property info - Method to display an info toast notification.
 * @property warning - Method to display a warning toast notification.
 */
const toaster = {
	success: success,
	error: error,
	info: info,
	warning: warning,
};

export { toaster as toast };
