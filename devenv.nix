{ pkgs, ... }:

{
  languages.javascript.enable = true;
  languages.javascript.corepack.enable = true;
  languages.typescript.enable = true;

  packages = with pkgs; [ nodePackages.prettier ];
}
