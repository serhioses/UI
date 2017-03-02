import React from 'react';
import simpla from 'simpla';
import 'simplaUI';
import UI from 'UI';

export default class Bundle extends UI {
    constructor(props) {
        super(props);

        this.bundles = [];
        this.indexes = null;
    }
    componentDidMount() {
        var bundles = [];

        bundles.push(new simpla.UI.Bundle('search-trigger', 'search__close'));

        this.bundles = bundles;

        this.bundles.forEach(function (bundle) {
            bundle.init();
        });
    }
    componentWillUnmount() {
        var currentBundle = this.bundles[0],
            pos, i;

        if (!currentBundle) {
            return;
        }

        pos = simpla.storage.bundles.indexOf(currentBundle);

        if (pos !== -1) {
            simpla.storage.bundles.splice(pos, 1);
        }
    }
    render() {
        return (
            <div className="content">
                <div className="container">
                    <h1 className="title">Bundle</h1>
                    <h2 className="subtitle">Описание</h2>
                    <div className="description">
                        <p>Данный виджет реализует возможность по нажатии на триггер добавлять/удалять класс триггеру и элементам, связанным с ним. Такой простой функционал, тем не менее, позволяет создавать анимированные меню, сайдбары, просто открывать/закрывать блоки. Также можно добавить задний фон страницы (overlay) и кнопки закрытия.</p>
                        <p>Одним из примеров данного виджета является меню мобильной версии.</p>
                        <h3>Возможности:</h3>
                        <ul>
                            <li>Функция обратного вызова по нажатии на любой элемент связки.</li>
                        </ul>
                    </div>
                    <h2 className="title title--small">В действии</h2>
                    <h3 className="subtitle">Пример</h3>
                    <div className="example">
                        <button className="search-trigger button button--default button--blue js-ripple-button" data-container="search" data-body="true" data-bundle-outside="true" data-bundle-id="search" data-bundle-action="toggle" data-bundle data-color-action="lighten" data-percent="30">
                            <span className="button__text">Показать поиск</span>
                        </button>
                    </div>
                    <div className="search" data-bundle-outside="true">
                        <div className="search__inner">
                            <input className="search__field form-field" placeholder="Введите слово для поиска" />
                        </div>
                        <button className="search__close" data-bundle-outside="true" data-bundle-id="search" data-bundle-action="close" data-bundle>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                                <path d="M0 0h24v24H0z" fill="none"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}