import React from 'react';
import eclipse from 'eclipse';
import 'eclipse-ui';
import UI from 'UI';

export default class Spinner extends UI {
    constructor(props) {
        super(props);

        this.spinners = [];
        this.indexes = null;
    }
    componentDidMount() {
        var spinners = [];

        spinners.push(new eclipse.UI.Spinner('spinner', {
            min: 1,
            max: 30,
            initial: 1
        }));

        this.spinners = spinners;

        this.spinners.forEach(function (spinner) {
            spinner.init();
        });
    }
    componentDidUpdate(prevProps, prevState) {
        this.handleUIUpdate('spinner', 'spinners', this.indexes);
    }
    componentWillUpdate(nextProps, nextState) {
        this.indexes = nextProps.update.spinner.indexes;
    }
    render() {
        return (
            <div className="content">
                <div className="container">
                    <h1 className="title">Spinner</h1>
                    <h2 className="subtitle">Описание</h2>
                    <div className="description">
                        <p>Данный виджет реализует возможность увеличения/уменьшения счетчика по нажатию на кнопки управления.</p>
                        <h3>Возможности:</h3>
                        <ul>
                            <li>Округление до заданной точности;</li>
                            <li>увеличение/уменьшение в момент удержания кнопки (в том числе и на мобильных устройствах);</li>
                            <li>скорость обновления счетчика;</li>
                            <li>время задержки обновления при зажатии кнопки;</li>
                            <li>возможность задания минимального и максимального значения;</li>
                            <li>возможность задания шага.</li>
                        </ul>
                    </div>
                    <h2 className="title title--small">В действии</h2>
                    <div className="row clearfix">
                        <div className="col-md-6 right">
                            <h3 className="subtitle">Настройки</h3>
                            <div className="settings">
                                <input id="launch-on-clamp" className="none" type="checkbox" value="1" defaultChecked={true} data-ui="spinner" data-property="launchOnClamp" data-property-type="boolean" data-indexes="0" />
                                <label className="checkbox" htmlFor="launch-on-clamp">Обновление при зажатии</label>
                                <label className="settings__title settings__title--location_inside" htmlFor="speed">Скорость обновления</label>
                                <input id="speed" className="form-field" type="number" min="0" placeholder="Введите милисекунды" data-ui="spinner" data-property="speed" data-property-type="any" data-indexes="0" />
                                <label className="settings__title settings__title--location_inside" htmlFor="delay">Задержка перед обновлением</label>
                                <input id="delay" className="form-field" type="number" min="0" placeholder="Введите милисекунды" data-ui="spinner" data-property="delay" data-property-type="any" data-indexes="0" />
                                <label className="settings__title settings__title--location_inside" htmlFor="step">Шаг</label>
                                <input id="step" className="form-field" type="number" min="0" placeholder="Введите число" data-ui="spinner" data-property="step" data-property-type="any" data-indexes="0" />
                                <label className="settings__title settings__title--location_inside" htmlFor="precision">Округление</label>
                                <input id="precision" className="form-field" type="number" min="0" placeholder="Введите количество знаков" data-ui="spinner" data-property="precision" data-property-type="any" data-indexes="0" />
                            </div>
                        </div>
                        <div className="col-md-6 left">
                            <h3 className="subtitle">Пример</h3>
                            <div className="example">
                                <div id="spinner" className="spinner" data-spinner>
                                    <input className="spinner__field form-field text-ultralarge sp-field" type="text" defaultValue="1" data-min="-1" data-max="30" data-step="1" data-precision="0" data-initial="0" />
                                    <button className="spinner__control spinner__control--plus sp-control sp-control--plus js-ripple-button" data-color-action="darken" data-percent="30">
                                        <span className="spinner__control-text">+</span>
                                    </button>
                                    <button className="spinner__control spinner__control--minus sp-control sp-control--minus js-ripple-button" data-color-action="darken" data-percent="30">
                                        <span className="spinner__control-text">—</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}