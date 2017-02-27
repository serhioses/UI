import React from 'react';
import simpla from 'simpla';
import 'simplaUI';
import UI from 'UI';

export default class Dropdown extends UI {
    constructor(props) {
        super(props);
        this.dropdowns = [];
        this.indexes = null;
    }
    componentDidMount() {
        var dropdowns = [];

        simpla.UI.Dropdown.hideOutside();

        dropdowns.push(new simpla.UI.Dropdown('dropdown', {
            trigger: 'dd-trigger',
            effect: 'slide',
            animationDuration: 300
        }));

        dropdowns.push(new simpla.UI.Dropdown('dropdown-1', {
            trigger: 'dd-trigger'
        }));
        dropdowns.push(new simpla.UI.Dropdown('dropdown-2', {
            trigger: 'dd-trigger'
        }));

        this.dropdowns = dropdowns;
        this.dropdowns.forEach(function (dropdown) {
            dropdown.init();
        });
    }
    componentDidUpdate(prevProps, prevState) {
        this.handleUIUpdate('dropdown', 'dropdowns', this.indexes);
    }
    componentWillUpdate(nextProps, nextState) {
        this.indexes = nextProps.update.dropdown.indexes;
    }
    render() {
        return (
            <div className="content">
                <div className="container">
                    <h1 className="title">Dropdown</h1>
                    <h2 className="subtitle">Описание</h2>
                    <div className="description">
                        <p>Данный виджет реализует возможность открытия скрытого блока по клику на триггер.</p>
                        <h3>Возможности:</h3>
                        <ul>
                            <li>Закрытие по клику вне области виджета;</li>
                            <li>закрытие по клику на другой виджет;</li>
                            <li>закрытие вложенных открытых списков при закрытии родительского;</li>
                            <li>закрытие соседних списков по отношению к текущему;</li>
                            <li>3 эффекта анимации: слайд, затухание, обычный показ;</li>
                            <li>задание продолжительности анимации;</li>
                            <li>4 функции обратного вызова: перед открытием, после открытия, перед закрытием, после закрытия;</li>
                            <li>возможность асинхронной загрузки списков;</li>
                            <li>возможность перезапуска с новыми настройками;</li>
                        </ul>
                    </div>
                    <h2 className="title title--small">Меню категорий</h2>
                    <div className="row clearfix">
                        <div className="col-md-6 right">
                            <h3 className="subtitle">Настройки</h3>
                            <div className="settings">
                                <input id="hide-nested" className="none" type="checkbox" value="1" defaultChecked={true} data-ui="dropdown" data-property="hideNested" data-property-type="boolean" data-indexes="0" />
                                <label className="checkbox" htmlFor="hide-nested">Прятать вложенные</label>
                                <input id="hide-siblings" className="none" type="checkbox" value="1" defaultChecked={true} data-ui="dropdown" data-property="hideSiblings" data-property-type="boolean" data-indexes="0" />
                                <label className="checkbox" htmlFor="hide-siblings">Прятать соседние</label>
                                <label className="settings__title settings__title--location_inside" htmlFor="animation-duration-1">Время анимации</label>
                                <input id="animation-duration-1" className="form-field" type="number" min="0" placeholder="Введите милисекунды" data-ui="dropdown" data-property="animationDuration" data-property-type="any" data-indexes="0" />
                                <h4 className="settings__title settings__title--location_inside">Функции обратного вызова</h4>
                                <div className="table">
                                    <div className="table-row">
                                        <div className="cell cell--top">
                                            <input id="before-open" className="none" type="checkbox" value="Before open" data-ui="dropdown" data-property="beforeOpen" data-property-type="function" data-indexes="0" />
                                            <label className="checkbox" htmlFor="before-open">Before open</label>
                                        </div>
                                        <div className="cell cell--top">
                                            <input id="after-open" className="none" type="checkbox" value="After open" data-ui="dropdown" data-property="afterOpen" data-property-type="function" data-indexes="0" />
                                            <label className="checkbox" htmlFor="after-open">After open</label>
                                        </div>
                                    </div>
                                    <div className="table-row">
                                        <div className="cell cell--top">
                                            <input id="before-close" className="none" type="checkbox" value="Before close" data-ui="dropdown" data-property="beforeClose" data-property-type="function" data-indexes="0" />
                                            <label className="checkbox" htmlFor="before-close">Before close</label>
                                        </div>
                                        <div className="cell cell--top">
                                            <input id="after-close" className="none" type="checkbox" value="After close" data-ui="dropdown" data-property="afterClose" data-property-type="function" data-indexes="0" />
                                            <label className="checkbox" htmlFor="after-close">After close</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 left">
                            <h3 className="subtitle">Пример</h3>
                            <div className="example">
                                <div id="dropdown" data-dropdown>
                                    <ul className="categories">
                                        <li className="categories__category category category--level_1 dd-dropdown" data-level="1">
                                            <span className="category__name category__name--level_1">
                                                Компьютеры
                                                <button className="category__trigger dd-trigger"></button>
                                            </span>
                                            <div className="category__drop category__drop--level_1 dd-drop">
                                                <ul className="category__subcategories category__subcategories--level_1">
                                                    <li className="categories__category category category--level_2 dd-dropdown" data-level="2">
                                                        <span className="category__name category__name--level_2">
                                                            Ноутбуки
                                                            <button className="category__trigger dd-trigger"></button>
                                                        </span>
                                                        <div className="category__drop category__drop--level_2 dd-drop">
                                                            <ul className="category__subcategories category__subcategories--level_2">
                                                                <li className="categories__category category category--level_3">
                                                                    <span className="category__name category__name--level_3">
                                                                        Lenovo
                                                                    </span>
                                                                </li>
                                                                <li className="categories__category category category--level_3">
                                                                    <span className="category__name category__name--level_3">
                                                                        Acer
                                                                    </span>
                                                                </li>
                                                                <li className="categories__category category category--level_3">
                                                                    <span className="category__name category__name--level_3">
                                                                        Asus
                                                                    </span>
                                                                </li>
                                                                <li className="categories__category category category--level_3">
                                                                    <span className="category__name category__name--level_3">
                                                                        Lenovo
                                                                    </span>
                                                                </li>
                                                                <li className="categories__category category category--level_3">
                                                                    <span className="category__name category__name--level_3">
                                                                        HP
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </li>
                                                    <li className="categories__category category category--level_2 dd-dropdown" data-level="2">
                                                        <span className="category__name category__name--level_2">
                                                            Домашний компьютер
                                                            <button className="category__trigger dd-trigger"></button>
                                                        </span>
                                                        <div className="category__drop category__drop--level_2 dd-drop">
                                                            <ul className="category__subcategories category__subcategories--level_2">
                                                                <li className="categories__category category category--level_3">
                                                                    <span className="category__name category__name--level_3">
                                                                        Artline
                                                                    </span>
                                                                </li>
                                                                <li className="categories__category category category--level_3">
                                                                    <span className="category__name category__name--level_3">
                                                                        Everest
                                                                    </span>
                                                                </li>
                                                                <li className="categories__category category category--level_3">
                                                                    <span className="category__name category__name--level_3">
                                                                        Lenovo
                                                                    </span>
                                                                </li>
                                                                <li className="categories__category category category--level_3">
                                                                    <span className="category__name category__name--level_3">
                                                                        PricePC
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li className="categories__category category category--level_1 dd-dropdown" data-level="1">
                                            <span className="category__name category__name--level_1">
                                                Бытовая техника
                                                <button className="category__trigger dd-trigger"></button>
                                            </span>
                                            <div className="category__drop category__drop--level_1 dd-drop">
                                                <ul className="category__subcategories category__subcategories--level_1">
                                                    <li className="categories__category category category--level_2 dd-dropdown" data-level="2">
                                                        <span className="category__name category__name--level_2">
                                                            Крупная техника
                                                            <button className="category__trigger dd-trigger"></button>
                                                        </span>
                                                        <div className="category__drop category__drop--level_2 dd-drop">
                                                            <ul className="category__subcategories category__subcategories--level_2">
                                                                <li className="categories__category category category--level_3">
                                                                    <span className="category__name category__name--level_3">
                                                                        Холодильники
                                                                    </span>
                                                                </li>
                                                                <li className="categories__category category category--level_3">
                                                                    <span className="category__name category__name--level_3">
                                                                        Плиты
                                                                    </span>
                                                                </li>
                                                                <li className="categories__category category category--level_3">
                                                                    <span className="category__name category__name--level_3">
                                                                        Стиральные машины
                                                                    </span>
                                                                </li>
                                                                <li className="categories__category category category--level_3">
                                                                    <span className="category__name category__name--level_3">
                                                                        Вытяжки
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </li>
                                                    <li className="categories__category category category--level_2 dd-dropdown" data-level="2">
                                                        <span className="category__name category__name--level_2">
                                                            Кухня
                                                            <button className="category__trigger dd-trigger"></button>
                                                        </span>
                                                        <div className="category__drop category__drop--level_2 dd-drop">
                                                            <ul className="category__subcategories category__subcategories--level_2">
                                                                <li className="categories__category category category--level_3">
                                                                    <span className="category__name category__name--level_3">
                                                                        Мультиварки
                                                                    </span>
                                                                </li>
                                                                <li className="categories__category category category--level_3">
                                                                    <span className="category__name category__name--level_3">
                                                                        Мясорубки
                                                                    </span>
                                                                </li>
                                                                <li className="categories__category category category--level_3">
                                                                    <span className="category__name category__name--level_3">
                                                                        Тостеры
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li className="categories__category category category--level_1 dd-dropdown" data-level="1">
                                            <span className="category__name category__name--level_1">
                                                Мебель
                                                <button className="category__trigger dd-trigger"></button>
                                            </span>
                                            <div className="category__drop category__drop--level_1 dd-drop">
                                                <ul className="category__subcategories category__subcategories--level_1">
                                                    <li className="categories__category category category--level_2">
                                                        <span className="category__name category__name--level_2">
                                                            Столы
                                                        </span>
                                                    </li>
                                                    <li className="categories__category category category--level_2">
                                                        <span className="category__name category__name--level_2">
                                                            Стулья
                                                        </span>
                                                    </li>
                                                    <li className="categories__category category category--level_2">
                                                        <span className="category__name category__name--level_2">
                                                            Шкафы
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li className="categories__category category category--level_1">
                                            <span className="category__name category__name--level_1">
                                                Спорт
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 className="title title--small">Различные эффекты</h2>
                    <div className="row clearfix">
                        <div className="col-md-6 right">
                            <h3 className="subtitle">Настройки</h3>
                            <div className="settings">
                                <h4 className="settings__title">Эффект</h4>
                                <input id="effect-1" className="none" type="radio" name="effect" value="toggle" defaultChecked={true} data-ui="dropdown" data-property="effect" data-property-type="any" data-indexes="1,2" />
                                <label className="checkbox" htmlFor="effect-1">Резко</label>
                                <input id="effect-2" className="none" type="radio" name="effect" value="fade" data-ui="dropdown" data-property="effect" data-property-type="any" data-indexes="1,2" />
                                <label className="checkbox" htmlFor="effect-2">Затухание</label>
                                <input id="effect-3" className="none" type="radio" name="effect" value="slide" data-ui="dropdown" data-property="effect" data-property-type="any" data-indexes="1,2" />
                                <label className="checkbox" htmlFor="effect-3">Слайд</label>
                                <label className="settings__title settings__title--location_inside" htmlFor="animation-duration-2">Время анимации</label>
                                <input id="animation-duration-2" className="form-field" type="number" min="0" placeholder="Enter miliseconds" data-ui="dropdown" data-property="animationDuration" data-property-type="any" data-indexes="1,2" />
                            </div>
                        </div>
                        <div className="col-md-6 left">
                            <h3 className="subtitle">Пример</h3>
                            <div className="example">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div id="dropdown-1" data-outside="true" data-other-dropdowns="true" data-dropdown>
                                            <div className="select dd-dropdown" data-level="1">
                                                <div className="select__value dd-trigger">
                                                    Сортировка
                                                </div>
                                                <div className="select__drop dd-drop">
                                                    <div className="select__items">
                                                        <div className="select__item select__item--selected">от дешевых к дорогим</div>
                                                        <div className="select__item">от дорогих к дешевым</div>
                                                        <div className="select__item">по рейтингу</div>
                                                        <div className="select__item">новинки</div>
                                                        <div className="select__item">акции</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div id="dropdown-2" data-outside="true" data-other-dropdowns="true" data-dropdown>
                                            <div className="select dd-dropdown" data-level="1">
                                                <div className="select__value dd-trigger">
                                                    Город
                                                </div>
                                                <div className="select__drop dd-drop">
                                                    <div className="select__items">
                                                        <div className="select__item select__item--selected">Днепр</div>
                                                        <div className="select__item">Киев</div>
                                                        <div className="select__item">Харьков</div>
                                                        <div className="select__item">Львов</div>
                                                        <div className="select__item">Донецк</div>
                                                        <div className="select__item">Одесса</div>
                                                        <div className="select__item">Полтава</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}