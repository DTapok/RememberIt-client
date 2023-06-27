import React from "react";
import "./main.css"

const Main = () => {
    return (
        <div className="mainP" >
            <div className="mainPage">
                <div className="mainPage__textPage">
                    RememberIt твой помошник в обучении с ипользованием флеш-карточек!
                </div>
                <div>
                    <div className="mainPage__textPage2">
                        Флеш-карточки – это обычная картонка либо же картинка в электронном виде,
                        на которой с одной стороны размещен
                    </div>
                    <div className="mainPage__textPage2">
                        вопрос (дата, термин, деятель), а с другой – ответ.
                    </div>
                    <div className="mainPage__textPage2">
                        Обучаться с помощью флеш-карточек намного удобней и практичней, чем простое заучивание.
                    </div>
                </div>

                <div className="mainPage__textPage">
                    По вопросам обращаться на email: RememberItMERN@gmail.com
                </div>
            </div>

        </div>
    )
}

export default Main;