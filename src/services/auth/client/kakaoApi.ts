import axios from "axios";
import { Token, UserInfo } from "../../../interface/dto/response/authResponse";
import logger from "../../../api/middlewares/logger";
import { isEmail } from "../../../modules/validator";


async function auth(
    kakaoAccessToken: Token
): Promise<UserInfo | undefined> { 
    try {

        const apiUrl = "https://kapi.kakao.com/v2/user/me";
        const reqConfig = {
            headers: {
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                "Authorization": `Bearer ${kakaoAccessToken}`
            }
        };

        const userData = await axios.post(apiUrl, {},reqConfig)
            .then((resolve) => {
                const nickname: string = resolve.data.properties["nickname"];
                const email: string = resolve.data.kakao_account["email"];
                return { nickname, email };
            });

        if (!isEmail(userData.email)) {
            throw new Error("Validation isEmail on email failed");
        }

        return userData;

    } catch (error) {
        logger.appLogger.log({ level: 'error', message: error.message }); 
        throw new Error("AXIOS_ERROR");
    }
};



async function unlink(
    kakaoAccessToken?: Token
): Promise<void> {
    try {

        const apiUrl = "https://kapi.kakao.com/v1/user/unlink";
        const reqConfig = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${kakaoAccessToken}`
            }
        };

        const userData = await axios.post(apiUrl, {}, reqConfig);
        logger.httpLogStream.write({ level: "info", message: userData });

    } catch (error) {
        logger.appLogger.log({ level: 'error', message: error.message });
        throw new Error("AXIOS_ERROR");
    }
};

const kakaoApiUtil = {
    auth,
    unlink,
};

export default kakaoApiUtil;