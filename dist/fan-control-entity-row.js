window.customCards = window.customCards || [];
window.customCards.push({
  type: "fan-control-entity-row",
  name: "fan control entity row",
  description: "A plugin to display your fan controls in a button row.",
  preview: false,
});

class CustomFanCard extends Polymer.Element {

    static get template() {
        return Polymer.html`
            <style is="custom-style" include="iron-flex iron-flex-alignment"></style>
            <style>
                :host {
                    line-height: 1.5;
                }
                .speed {
                    min-width: 30px;
                    max-width: 30px;
                    margin-left: 0px;
                    margin-right: 0px;
                }
                ha-entity-toggle {
                    margin-left: 16px;
                }
            </style>
            <hui-generic-entity-row hass="[[hass]]" config="[[_config]]">
                <div class='horizontal justified layout' on-click="stopPropagation">
                    <mwc-button
                        class='speed'
                        toggles name="1"
                        on-click='setSpeed'
                        disabled='[[_is1Speed]]'>1</mwc-button>
                    <mwc-button
                        class='speed'
                        toggles name="2"
                        on-click='setSpeed'
                        disabled='[[_is2Speed]]'>2</mwc-button>
                    <mwc-button
                        class='speed'
                        toggles name="3"
                        on-click='setSpeed'
                        disabled='[[_is3Speed]]'>3</mwc-button>
                    <mwc-button
                        class='speed'
                        toggles name="4"
                        on-click='setSpeed'
                        disabled='[[_is4Speed]]'>4</mwc-button>
                    <mwc-button
                        class='speed'
                        toggles name="5"
                        on-click='setSpeed'
                        disabled='[[_is5Speed]]'>5</mwc-button>
                    <mwc-button
                        class='speed'
                        toggles name="6"
                        on-click='setSpeed'
                        disabled='[[_is6Speed]]'>6</mwc-button>
                    <ha-entity-toggle hass="[[hass]]" state-obj="[[_stateObj]]"></ha-entity-toggle>
                </div>
            </hui-generic-entity-row>
        `;
    }

    static get properties() {
        return {
            hass: {
                type: Object,
                observer: 'hassChanged'
            },
            _config: Object,
            _stateObj: Object,
            _is1Speed: Boolean,
            _is2Speed: Boolean,
            _is3Speed: Boolean,
            _is4Speed: Boolean,
            _is5Speed: Boolean,
            _is6Speed: Boolean
        }
    }

    setConfig(config) {
        this._config = config;
    }

    hassChanged(hass) {

        const config = this._config;
        const stateObj = hass.states[config.entity];

        let speed;
        if (stateObj && stateObj.attributes) {
            speed = stateObj.attributes.speed || 'off';
        }

        this.setProperties({
            _stateObj: stateObj,
            _is1Speed: speed === '1',
            _is2Speed: speed === '2',
            _is3Speed: speed == '3',
            _is4Speed: speed == '4',
            _is5Speed: speed == '5',
            _is6Speed: speed == '6'
        });
    }

    stopPropagation(e) {
        e.stopPropagation();
    }

    setSpeed(e) {
        const speed = e.currentTarget.getAttribute('name');
        this.hass.callService('fan', 'set_speed', {
            entity_id: this._config.entity, speed: speed
        });
    }

}

customElements.define('my-custom-fan-card', CustomFanCard);
