﻿/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
module game {
    export class PanelRegister extends PanelRegisterUI {
        private codeTimer: egret.Timer;
        private codeCount: number;

        public constructor() {
            super();
            this.name = "panelRegister";
           
        }

        public handleAddStage(): void {
            super.handleAddStage();
            var self = this;
            var scale: number = (self.stage.stageHeight * 9 / 16) / self.stage.stageWidth;
            self.UIA_bg.scaleX = 1 / scale;
            self.UIA_bg.horizontalCenter = 0;
        }

        public createCompleteEvent(event: egret.gui.UIEvent): void {
            super.createCompleteEvent(event);
            this.label_second.visible = false;
            this.codeCount = 60;
            this.ti_pass.text = "";
           // this.ti_pw.enabled = this.ti_pw2.enabled = false;
            this.label_name.visible = this.label_pw.visible = this.label_pw2.visible = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTouchTap, this);
            this.ti_name.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeName, this);
            this.ti_pass.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeName2, this);
            this.ti_pw.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changePw, this);
            this.ti_pw2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changePw2, this);
        }

        public openPanel(): void {
            this.ti_pass.text = "";
            //this.ti_name.text = "请输入手机号";
            ////this.ti_pass.text = "请输入验证码";
            //this.ti_pw.text = "请输入密码";
            //this.ti_pw2.text = "请重复密码";
        }

        private changeName(): void {
            this.checkName(this.label_name, this.ti_name, 1);
            this.checkName(this.label_pw, this.ti_pw, 0);
            this.checkName(this.label_pw2, this.ti_pw2, 0);
        }

        private changeName2(): void {
            this.checkName(this.label_name, this.ti_name, 0);
            this.checkName(this.label_pw, this.ti_pw, 0);
            this.checkName(this.label_pw2, this.ti_pw2, 0);
        }

        private changePw(): void {
            this.checkName(this.label_name, this.ti_name, 0);
            this.checkName(this.label_pw, this.ti_pw, 1);
            this.checkName(this.label_pw2, this.ti_pw2, 0);
        }

        private changePw2(): void {
            this.checkName(this.label_name, this.ti_name, 0);
            this.checkName(this.label_pw, this.ti_pw, 0);
            this.checkName(this.label_pw2, this.ti_pw2, 1);
        }

        private handleTouchTap(e: egret.TouchEvent): void {
            var obj: any = e.target;
            if (obj) {
                switch (obj.name) {
                    case "btn_back":
                        game.GameUI.getInstance().manage_panel("panelLogin", "open", true);
                        break;
                    case "btn_ok":  
                        this.goRegister();
                        break;
                    case "btn_code":
                        this.getCode();
                    case "UIA_bg":
                    case "UIA_logo":
                    case "UIA_1":
                    case "UIA_2":
                    case "UIA_3":
                    case "UIA_4":
                    case "UIA_11":
                    case "UIA_22":
                    case "UIA_33":
                    case "UIA_44":
                        this.checkName(this.label_name, this.ti_name, 0);
                        this.checkName(this.label_pw, this.ti_pw, 0);
                        this.checkName(this.label_pw2, this.ti_pw2, 0);
                        break;
                    default:
                        break;
                }
            }
        }

        private getCode(): void {
            if (1) {
                //TD: send messages
                if (this.codeTimer ){
                    this.codeTimer.removeEventListener(egret.TimerEvent.TIMER,this.codeProgress, this);
                    this.codeTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.codeComplete,this);
                    this.codeTimer.stop();
                }
                this.btn_code.enabled = false;
                this.label_second.text = "(60)";
                this.label_second.visible = true;
                this.codeCount = 60;
                this.codeTimer = new egret.Timer(1000, 60);
                this.codeTimer.addEventListener(egret.TimerEvent.TIMER, this.codeProgress, this);
                this.codeTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.codeComplete, this);
                this.codeTimer.start();

            } else {
                GameUI.getInstance().alertMag("请输入正确的手机号!",1);
            }
        }

        private codeProgress(e: egret.TimerEvent): void {
            this.codeCount--;
            this.label_second.text = "(" + this.codeCount.toString() + ")";
        }

        private codeComplete(e: egret.TimerEvent): void {
            this.codeTimer.removeEventListener(egret.TimerEvent.TIMER, this.codeProgress, this);
            this.codeTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.codeComplete, this);
            this.codeTimer.stop();
            this.label_second.visible = false;
            this.btn_code.enabled = true;
        }

        /**
          *@ param target -->label
          *@ param show -->TextInput
          *@ param value  0-->leave   1-->in
          */
        private checkName(target:any,show:any,value: number): void {
            if (value == 0) {
                target.visible = show.text == "" ? true : false;
            } else if (value == 1) {
                target.visible = false;
            }
        }

        private checkRegister(): boolean {
            var alert: string = "";
            var reg: RegExp = /^\d+$/g;
            var regPW: RegExp = /^[A-Za-z0-9]+$/g;
            if (!reg.test(this.ti_name.text) || this.ti_name.text.length != 11 || this.ti_name.text.charAt(0) != "1") {
                alert = ConstString.mPhone;
            }
            if (0){
                alert = (alert == "") ? ConstString.mPass : alert;
            }
            //if (this.ti_pw.text == "") {
            //    alert = (alert == "") ? ConstString.mPW1 : alert;
            //}
            //if (this.ti_pw.text.length < 6) {
            //    alert = (alert == "") ? ConstString.mPW2 : alert;
            //}
            //if (!regPW.test(this.ti_pw.text)) {
            //    alert = (alert == "") ? ConstString.mPW3 : alert;
            //}
            //if ( this.ti_pw.text != this.ti_pw2.text){
            //    alert = (alert == "") ? ConstString.mPW4 : alert;
            //}
            if (alert != "") {
                GameUI.getInstance().alertMag(alert, 1, 3, 0);
                return false;
            }
            return true;
        }

        private goRegister(): void {
           // if (this.checkRegister()) {
            NetCenter.getInstance().mPanel.mPanelRate = true;
            NetCenter.getInstance().register(this.ti_name.text,this.ti_pw.text,this.ti_pass.text,true);
            //}
        }

        public destPanel(): void {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTouchTap, this);
            this.ti_name.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeName, this);
            this.ti_pass.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeName2, this);
            this.ti_pw.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changePw, this);
            this.ti_pw2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changePw2, this);
        }
    }
}