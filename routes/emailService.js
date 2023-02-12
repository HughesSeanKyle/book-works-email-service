import express from 'express';
import {
	sendMailWithCode,
	verifyActionCode,
} from '../modules/emailVerification/emailVerification.js';
const router = express.Router();

router.post('/email/send-confirm-code', async (req, res) => {
	try {
		const { recipient, message } = req.body;
		const result = await sendMailWithCode(recipient, message);

		return res.status(200).json({ data: result, error: null });
	} catch (error) {
		return (
			res.status(500),
			json({
				data: null,
				error: error,
			})
		);
	}
});

router.post('/email/verify-action-code', async (req, res) => {
	try {
		const { recipient, code } = req.body;
		const result = await verifyActionCode(recipient, code);

		return res.status(200).json({ data: result, error: null });
	} catch (error) {
		return (
			res.status(500),
			json({
				data: null,
				error: error,
			})
		);
	}
});

export default router;
