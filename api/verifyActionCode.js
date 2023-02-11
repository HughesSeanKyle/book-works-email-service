import { verifyCode } from 'email-verification-code';
import dotenv from 'dotenv';

dotenv.config();

export default async function verifyActionCode(req, res) {
	try {
		const { email, code } = req.body;

		const whitelist = [
			process.env.WHITELISTED_DOMAIN_ONE,
			process.env.WHITELISTED_DOMAIN_TWO,
			process.env.WHITELISTED_DOMAIN_THREE,
		];
		const origin = req.headers.origin;

		if (!whitelist.includes(origin)) {
			return res.status(403).json({ data: null, error: 'Forbidden' });
		}

		const response = await verifyCode(email, code);

		if (response.error) {
			return res.status(400).json({
				data: null,
				error: response.reason,
			});
		}

		return res
			.status(200)
			.json({ data: 'Code verified successfuly', error: null });
	} catch (error) {
		return res.status(500).json({
			data: null,
			error: error.message,
		});
	}
}
