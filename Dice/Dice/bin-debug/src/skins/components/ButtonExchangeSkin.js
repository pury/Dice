var skins;
(function (skins) {
    var components;
    (function (components) {
        var ButtonExchangeSkin = (function (_super) {
            __extends(ButtonExchangeSkin, _super);
            function ButtonExchangeSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["minHeight", "minWidth"], [60, 140]);
                this.elementsContent = [this.__4_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", [
                        new egret.gui.SetProperty("__4", "source", "exchange_png")
                    ]),
                    new egret.gui.State("disabled", [
                        new egret.gui.SetProperty("__4", "source", "exchange_png")
                    ])
                ];
            }
            var __egretProto__ = ButtonExchangeSkin.prototype;
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__4 = t;
                this.__s(t, ["percentHeight", "source", "percentWidth"], [100, "exchange_png", 100]);
                return t;
            };
            return ButtonExchangeSkin;
        })(egret.gui.Skin);
        components.ButtonExchangeSkin = ButtonExchangeSkin;
        ButtonExchangeSkin.prototype.__class__ = "skins.components.ButtonExchangeSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));